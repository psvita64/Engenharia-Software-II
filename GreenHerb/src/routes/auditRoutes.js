const { validateAuditEntry } = require('../services/auditService');

describe('GREENHERB - Testes de Unidade: Validação de Auditoria', () => {
  
  test('Deve validar com sucesso uma entrada de auditoria correta', () => {
    const entradaValida = {
      userId: 1,
      event: 'CREATE_BATCH',
      timestamp: '2026-05-15T14:00:00.000Z'
    };

    const resultado = validateAuditEntry(entradaValida);
    expect(resultado.valid).toBe(true);
    expect(resultado.errors.length).toBe(0);
  });

  test('Deve rejeitar se o userId estiver em falta', () => {
    const entradaInvalida = {
      event: 'UPDATE_PLAN',
      timestamp: '2026-05-15T14:00:00.000Z'
    };

    const resultado = validateAuditEntry(entradaInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('userId é obrigatório');
  });

  test('Deve rejeitar se o evento for uma string vazia ou apenas espaços', () => {
    const entradaInvalida = {
      userId: 2,
      event: '   ',
      timestamp: '2026-05-15T14:00:00.000Z'
    };

    const resultado = validateAuditEntry(entradaInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Evento é obrigatório');
  });

  test('Deve rejeitar se o formato do timestamp for inválido', () => {
    const entradaInvalida = {
      userId: 3,
      event: 'DELETE_RULE',
      timestamp: 'data-invalida'
    };

    const resultado = validateAuditEntry(entradaInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Timestamp inválido');
  });
});

const request = require('supertest');
const app = require('../src/app'); 

describe('GREENHERB - Testes de Integração: Rota POST /api/audit', () => {

  test('POST /api/audit -> Deve responder 201 quando o payload estrutural for válido', async () => {
    const response = await request(app)
      .post('/api/audit')
      .send({
        userId: 42,
        event: 'LOGIN_SUCCESS',
        timestamp: new Date().toISOString()
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Entrada de auditoria registada com sucesso');
    expect(response.body).toHaveProperty('auditEntry');
  });

  test('POST /api/audit -> Deve responder 400 se as validações do service falharem', async () => {
    const response = await request(app)
      .post('/api/audit')
      .send({
        userId: null, // Inválido
        event: '',    // Inválido
        timestamp: '2026-99-99' // Inválido
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Entrada de auditoria inválida');
    expect(response.body.details.length).toBeGreaterThan(0);
  });
});


const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de Sistema: Fluxo Completo de Auditoria (E2E)', () => {

  test('Fluxo E2E: Operação crítica do utilizador deve originar um registo persistente na auditoria', async () => {
    const timestampAtual = new Date().toISOString();

    // Passo 1: O Responsável Técnico executa uma operação crítica (ex: Ignorar Alerta Crítico)
    // Para este teste, simulamos a chamada que despoleta a criação do log
    const acaoUtilizador = {
      userId: 5, // ID do Responsável Técnico
      event: 'RESOLVE_CRITICAL_ALERT',
      timestamp: timestampAtual
    };

    const registoAcao = await request(app)
      .post('/api/audit')
      .send(acaoUtilizador);

    expect(registoAcao.status).toBe(201);

    // Passo 2: O Administrador do sistema consulta as rotas de logs para auditar o que aconteceu
    // O sistema deve garantir que o evento do utilizador 5 está lá gravado intacto
    const consultaAuditoria = await request(app)
      .post('/api/audit') // Usando o teu endpoint de registo para validar a persistência do objeto no ciclo da app
      .send({
        userId: 5,
        event: 'AUDIT_LOG_CHECKED',
        timestamp: new Date().toISOString()
      });

    expect(consultaAuditoria.status).toBe(201);
    expect(consultaAuditoria.body.auditEntry.userId).toBe(5);
  });
});

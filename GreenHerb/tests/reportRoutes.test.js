const request = require('supertest');
const app = require('../src/app'); // Importa a tua app Express global
const { validateReportRequest } = require('../services/reportService');

/* ==========================================================================
   1. TESTES DE UNIDADE (Nível 1) - Validação Lógica Isolada
   ========================================================================= */
describe('GREENHERB - Testes de Unidade: Validação de Pedidos de Relatório', () => {

  // --- 1.1. PARTICIONAMENTO DE EQUIVALÊNCIA (Tipos de Relatório) ---
  test('Deve validar com sucesso um pedido com dados e tipo corretos', () => {
    const pedidoValido = {
      type: 'weekly',
      from: '2026-05-01T00:00:00.000Z',
      to: '2026-05-07T23:59:59.000Z'
    };

    const resultado = validateReportRequest(pedidoValido);
    expect(resultado.valid).toBe(true);
    expect(resultado.errors.length).toBe(0);
  });

  test('Deve rejeitar se o tipo de relatório não for reconhecido pelo sistema', () => {
    const pedidoInvalida = {
      type: 'yearly', // Não está no array validTypes
      from: '2026-05-01',
      to: '2026-05-07'
    };

    const resultado = validateReportRequest(pedidoInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Tipo de relatório inválido');
  });

  test('Deve rejeitar se as datas estiverem em formatos corrompidos ou inválidos', () => {
    const pedidoInvalida = {
      type: 'daily',
      from: 'data-errada',
      to: 'outra-data-errada'
    };

    const resultado = validateReportRequest(pedidoInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Data inicial inválida');
    expect(resultado.errors).toContain('Data final inválida');
  });

  // --- 1.2. ANÁLISE DE VALORES LIMITE (Regra: from <= to) ---
  describe('Análise de Valores Limite - Intervalo de Datas', () => {

    test('Data inicial idêntica à data final (Limite exato) -> Deve Aceitar', () => {
      const resultado = validateReportRequest({
        type: 'custom',
        from: '2026-05-15T12:00:00.000Z',
        to: '2026-05-15T12:00:00.000Z' //from === to
      });
      expect(resultado.valid).toBe(true);
    });

    test('Data inicial 1 segundo posterior à data final (Fora do limite) -> Deve Rejeitar', () => {
      const resultado = validateReportRequest({
        type: 'custom',
        from: '2026-05-15T12:00:01.000Z', // 1 segundo depois
        to: '2026-05-15T12:00:00.000Z'
      });
      expect(resultado.valid).toBe(false);
      expect(resultado.errors).toContain('Intervalo de datas inválido');
    });
  });
});

/* ==========================================================================
   2. TESTES DE INTEGRAÇÃO (Nível 2) - Contratos da Rota HTTP
   ========================================================================= */
describe('GREENHERB - Testes de Integração: Rota POST /api/reports', () => {

  test('POST /api/reports -> Deve responder 200 OK e devolver o sumário se o payload for válido', async () => {
    const response = await request(app)
      .post('/api/reports')
      .send({
        type: 'daily',
        from: '2026-05-15T00:00:00.000Z',
        to: '2026-05-15T23:59:59.000Z'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Relatório gerado com sucesso');
    expect(response.body.report).toHaveProperty('summary');
  });

  test('POST /api/reports -> Deve responder 400 Bad Request se falhar nos parâmetros estruturais', async () => {
    const response = await request(app)
      .post('/api/reports')
      .send({
        type: 'invalid_type',
        from: null,
        to: undefined
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Pedido de relatório inválido');
    expect(response.body.details.length).toBeGreaterThan(0);
  });
});

/* ==========================================================================
   3. TESTES DE SISTEMA (Nível 3) - Fluxo End-to-End (E2E)
   ========================================================================= */
describe('GREENHERB - Testes de Sistema: Pipeline de Auditoria de Relatórios', () => {

  test('Fluxo E2E: Extração sequencial de relatórios operacionais por parte do Gestor', async () => {
    
    // Passo 1: O Gestor da estufa gera um relatório diário para analisar o fecho do dia
    const relatorioDia = await request(app)
      .post('/api/reports')
      .send({
        type: 'daily',
        from: '2026-05-14T00:00:00.000Z',
        to: '2026-05-14T23:59:59.000Z'
      });

    expect(relatorioDia.status).toBe(200);
    expect(relatorioDia.body.report.type).toBe('daily');

    // Passo 2: De seguida, expande o foco e pede um histórico customizado mais abrangente
    const relatorioCustom = await request(app)
      .post('/api/reports')
      .send({
        type: 'custom',
        from: '2026-01-01T00:00:00.000Z',
        to: '2026-05-15T00:00:00.000Z'
      });

    expect(relatorioCustom.status).toBe(200);
    expect(relatorioCustom.body.report.type).toBe('custom');
  });
});

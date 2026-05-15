const request = require('supertest');
const app = require('../src/app'); // Importa a tua app Express global
const { validateBatch } = require('../src/services/batchService');

/* ==========================================================================
   1. TESTES DE UNIDADE (Nível 1) - Validação Lógica Isolada
   ========================================================================== */
describe('GREENHERB - Testes de Unidade: Validação de Lotes', () => {

  // --- 1.1. PARTICIONAMENTO DE EQUIVALÊNCIA (Casos Válidos e Inválidos) ---
  test('Deve validar com sucesso um lote com dados corretos', () => {
    const loteValido = {
      name: 'Lote Alfa - Manjericão',
      crop: 'Manjericão Sagrado',
      startDate: '2026-05-15T12:00:00.000Z',
      expectedDuration: 60,
      status: 'em andamento'
    };

    const resultado = validateBatch(loteValido);
    expect(resultado.valid).toBe(true);
    expect(resultado.errors.length).toBe(0);
  });

  test('Deve rejeitar se o nome do lote ou o cultivo estiverem vazios', () => {
    const loteInvalido = {
      name: '   ', // Apenas espaços
      crop: '',    // Vazio
      startDate: '2026-05-15T12:00:00.000Z',
      expectedDuration: 45,
      status: 'planejado'
    };

    const resultado = validateBatch(loteInvalido);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Nome do lote é obrigatório');
    expect(resultado.errors).toContain('Cultivo é obrigatório');
  });

  test('Deve rejeitar se a data de início for inválida', () => {
    const loteInvalido = {
      name: 'Lote Beta',
      crop: 'Alecrim',
      startDate: 'isto-nao-e-uma-data',
      expectedDuration: 90,
      status: 'planejado'
    };

    const resultado = validateBatch(loteInvalido);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Data de início inválida');
  });

  test('Deve rejeitar se o status não pertencer à lista permitida', () => {
    const loteInvalido = {
      name: 'Lote Gama',
      crop: 'Hortelã',
      startDate: '2026-05-15T12:00:00.000Z',
      expectedDuration: 30,
      status: 'destruído_por_praga' // Status fora do array válido
    };

    const resultado = validateBatch(loteInvalido);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Status do lote inválido');
  });

  // --- 1.2. ANÁLISE DE VALORES LIMITE (Aplicado à Duração Esperada: [1, 365] dias) ---
  describe('Análise de Valores Limite - Propriedade expectedDuration [1, 365]', () => {
    
    test('Limite Inferior Externo (0 dias) -> Deve Rejeitar', () => {
      const resultado = validateBatch({ name: 'A', crop: 'B', startDate: '2026-05-15', status: 'planejado', expectedDuration: 0 });
      expect(resultado.valid).toBe(false);
    });

    test('Limite Inferior Interno (1 dia) -> Deve Aceitar', () => {
      const resultado = validateBatch({ name: 'A', crop: 'B', startDate: '2026-05-15', status: 'planejado', expectedDuration: 1 });
      expect(resultado.valid).toBe(true);
    });

    test('Limite Superior Interno (365 dias) -> Deve Aceitar', () => {
      const resultado = validateBatch({ name: 'A', crop: 'B', startDate: '2026-05-15', status: 'planejado', expectedDuration: 365 });
      expect(resultado.valid).toBe(true);
    });

    test('Limite Superior Externo (366 dias) -> Deve Rejeitar', () => {
      const resultado = validateBatch({ name: 'A', crop: 'B', startDate: '2026-05-15', status: 'planejado', expectedDuration: 366 });
      expect(resultado.valid).toBe(false);
    });
  });
});

/* ==========================================================================
   2. TESTES DE INTEGRAÇÃO (Nível 2) - Contratos da Rota HTTP
   ========================================================================== */
describe('GREENHERB - Testes de Integração: Rota POST /batches', () => {

  test('POST /batches -> Deve responder 201 Created quando o payload estrutural for válido', async () => {
    const response = await request(app)
      .post('/batches')
      .send({
        name: 'Lote Estufa Sul',
        crop: 'Coentros',
        startDate: new Date().toISOString(),
        expectedDuration: 25,
        status: 'planejado'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Lote criado com sucesso!');
    expect(response.body).toHaveProperty('batch');
  });

  test('POST /batches -> Deve responder 400 Bad Request se falhar nas regras de negócio', async () => {
    const response = await request(app)
      .post('/batches')
      .send({
        name: '',
        crop: 'Tomilho',
        startDate: '2026-05-15',
        expectedDuration: -10, // Inválido
        status: 'invalido_status'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Dados do lote inválidos');
    expect(response.body.details.length).toBeGreaterThan(0);
  });
});

/* ==========================================================================
   3. TESTES DE SISTEMA (Nível 3) - Fluxo End-to-End (E2E)
   ========================================================================== */
describe('GREENHERB - Testes de Sistema: Ciclo de Vida Operacional do Lote', () => {

  test('Fluxo E2E: Planeamento de novo cultivo seguido do arranque oficial do lote na estufa', async () => {
    
    // Passo 1: O Responsável Agrícola cria o planeamento do lote (Status: planejado)
    const fasePlaneamento = await request(app)
      .post('/batches')
      .send({
        name: 'Lote Hidropónico 4',
        crop: 'Salsa frisada',
        startDate: '2026-06-01T08:00:00.000Z',
        expectedDuration: 40,
        status: 'planejado'
      });

    expect(fasePlaneamento.status).toBe(201);
    expect(fasePlaneamento.body.batch.status.toLowerCase()).toBe('planejado');

    // Passo 2: Chega o dia do cultivo. O Operador inicia o lote na estufa alterando o estado do ciclo de vida
    const faseExecucao = await request(app)
      .post('/batches')
      .send({
        name: 'Lote Hidropónico 4',
        crop: 'Salsa frisada',
        startDate: '2026-06-01T08:00:00.000Z',
        expectedDuration: 40,
        status: 'em andamento' // Transição de estado operacional
      });

    expect(faseExecucao.status).toBe(201);
    expect(faseExecucao.body.batch.status.toLowerCase()).toBe('em andamento');
  });
});

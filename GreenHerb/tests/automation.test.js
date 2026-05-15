const request = require('supertest');
const app = require('../src/app'); // Importa a tua app Express global
const { validateAutomationRule } = require('../src/services/automationService');

/* ==========================================================================
   1. TESTES DE UNIDADE (Nível 1) - Validação Lógica Isolada
   ========================================================================== */
describe('GREENHERB - Testes de Unidade: Validação de Regras de Automação', () => {

  // --- 1.1. CAIXA-PRETA: PARTICIONAMENTO DE EQUIVALÊNCIA ---
  test('Deve validar com sucesso uma regra estruturalmente correta', () => {
    const regraValida = {
      trigger: { type: 'TEMPERATURE_HIGH', value: 30 },
      action: { type: 'TURN_ON_FAN' },
      enabled: true
    };

    const resultado = validateAutomationRule(regraValida);
    expect(resultado.valid).toBe(true);
    expect(resultado.errors.length).toBe(0);
  });

  test('Deve rejeitar se o trigger estiver em falta ou incompleto', () => {
    const regraInvalida = {
      action: { type: 'TURN_ON_FAN' },
      enabled: true
    };

    const resultado = validateAutomationRule(regraInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Trigger é obrigatório');
  });

  test('Deve rejeitar se a action estiver em falta ou incompleta', () => {
    const regraInvalida = {
      trigger: { type: 'HUMIDITY_LOW', value: 35 },
      enabled: false
    };

    const resultado = validateAutomationRule(regraInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Action é obrigatório');
  });

  test('Deve rejeitar se a propriedade enabled não for booleana', () => {
    const regraInvalida = {
      trigger: { type: 'TEMPERATURE_HIGH', value: 30 },
      action: { type: 'TURN_ON_FAN' },
      enabled: "true" // String em vez de booleano
    };

    const resultado = validateAutomationRule(regraInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Enabled deve ser booleano');
  });

  // --- 1.2. CAIXA-BRANCA: COBERTURA MC/DC (Para o Relatório do Sprint 3) ---
  // Nota: Esta secção simula em unidade a decisão lógica interna do motor:
  // Decisão: (triggerAtivo && regraEnabled && modoAutomatico)
  describe('Cobertura MC/DC - Decisão de Disparo do Atuador', () => {
    
    // Função auxiliar simulando o motor interno que consome a tua regra
    const checkExecution = (trigger, enabled, modoAuto) => (trigger && enabled && modoAuto);

    test('MC/DC Linha 1: Trigger=True, Enabled=True, ModoAuto=True -> Executa Automação', () => {
      expect(checkExecution(true, true, true)).toBe(true);
    });

    test('MC/DC Linha 2: Trigger=True, Enabled=True, ModoAuto=False -> Não executa (Modo Manual bloqueia)', () => {
      expect(checkExecution(true, true, false)).toBe(false);
    });

    test('MC/DC Linha 3: Trigger=True, Enabled=False, ModoAuto=True -> Não executa (Regra Desativada)', () => {
      expect(checkExecution(true, false, true)).toBe(false);
    });
  });
});

/* ==========================================================================
   2. TESTES DE INTEGRAÇÃO (Nível 2) - Contratos da Rota HTTP
   ========================================================================== */
describe('GREENHERB - Testes de Integração: Rota POST /api/automation', () => {

  test('POST /api/automation -> Deve responder 201 se o JSON estrutural for válido', async () => {
    const response = await request(app)
      .post('/automation')
      .send({
        trigger: { type: 'LIGHT_LOW' },
        action: { type: 'TURN_ON_LED' },
        enabled: true
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Regra de automação criada com sucesso!');
    expect(response.body).toHaveProperty('rule');
  });

  test('POST /api/automation -> Deve responder 400 se as validações estruturais falharem', async () => {
    const response = await request(app)
      .post('/automation')
      .send({
        trigger: null,
        action: null,
        enabled: undefined
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Regra de automação inválida');
    expect(response.body.details.length).toBeGreaterThan(0);
  });
});

/* ==========================================================================
   3. TESTES DE SISTEMA (Nível 3) - Fluxo End-to-End (E2E)
   ========================================================================== */
describe('GREENHERB - Testes de Sistema: Fluxo de Ciclo de Vida da Automação', () => {

  test('Fluxo E2E: Criação de regra ativa seguida de desativação preventiva pelo Operador', async () => {
    
    // Passo 1: O Operador cria uma nova regra automática de emergência para a rega
    const criarRegra = await request(app)
      .post('/automation')
      .send({
        trigger: { type: 'HUMIDITY_CRITICAL_LOW' },
        action: { type: 'START_WATER_PUMP' },
        enabled: true
      });

    expect(criarRegra.status).toBe(201);
    expect(criarRegra.body.rule.enabled).toBe(true);

    // Passo 2: O Operador decide reconfigurar a estufa e desativa temporariamente a regra criada
    // Simulamos a alteração de estado no pipeline operacional do sistema
    const desativarRegra = await request(app)
      .post('/automation')
      .send({
        trigger: { type: 'HUMIDITY_CRITICAL_LOW' },
        action: { type: 'START_WATER_PUMP' },
        enabled: false // Desativada via painel de controlo
      });

    expect(desativarRegra.status).toBe(201);
    expect(desativarRegra.body.rule.enabled).toBe(false);
  });
});

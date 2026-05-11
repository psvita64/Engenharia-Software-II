const { validatePlan } = require('../src/services/planService');

describe('GREENHERB - Testes de Unidade - Plan Service', () => {


  // TESTES DE TIPOS DE PLANO
  test('Deve aceitar plano regular válido', () => {
    const plan = {
      type: 'regular',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 90,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar plano de emergência válido', () => {
    const plan = {
      type: 'emergencia',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 30,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  test('Deve rejeitar tipo de plano inválido', () => {
    const plan = {
      type: 'experimental',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 90,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Tipo de plano inválido');
  });

  // TESTES DE PLANO PONTUAL
  test('Deve rejeitar plano pontual sem autorização', () => {

    const plan = {
      type: 'pontual',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 30,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Plano pontual exige autorização');
  });

  test('Deve aceitar plano pontual com autorização', () => {
    const plan = {
      type: 'pontual',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 30,
      authorizedByResponsible: true
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  //Valores de Duração
  test('Deve rejeitar duração abaixo do limite mínimo (0)', () => {
    const plan = {
      type: 'regular',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 0,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Duração fora do intervalo permitido');
  });

  test('Deve aceitar duração no limite mínimo (1)', () => {
    const plan = {
      type: 'regular',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 1,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar duração nominal (90)', () => {
    const plan = {
      type: 'regular',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 90,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar duração no limite máximo (365)', () => {
    const plan = {
      type: 'regular',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 365,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  test('Deve rejeitar duração acima do limite máximo (366)', () => {
    const plan = {
      type: 'regular',
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 366,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Duração fora do intervalo permitido');
  });

  // Testes de Condições Múltiplas
  test('Deve rejeitar plano pontual sem autorização e temperatura inválida', () => {
    const plan = {
      type: 'pontual',
      temperature: 30,
      humidity: 60,
      luminosity: 15000,
      duration: 30,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Plano pontual exige autorização');
    expect(result.errors).toContain('Temperatura fora do intervalo permitido');
  });

});
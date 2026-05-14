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


  // --- VALORES LIMITE: JUSTIFICAÇÃO [10, 500] ---
  test('Deve rejeitar justificação muito curta (9 caracteres)', () => {
    const plan = { type: 'regular', temperature: 23, humidity: 60, luminosity: 15000, duration: 30, justification: 'abcde 123' };
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Justificação deve ter entre 10 e 500 caracteres');
  });

  test('Deve aceitar justificação no limite mínimo (10 caracteres)', () => {
    const plan = { type: 'regular', temperature: 23, humidity: 60, luminosity: 15000, duration: 30, justification: 'Justifica!' };
    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar justificação no limite máximo (500 caracteres)', () => {
    const longText = 'a'.repeat(500);
    const plan = { type: 'regular', temperature: 23, humidity: 60, luminosity: 15000, duration: 30, justification: longText };
    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  test('Deve rejeitar justificação acima do limite (501 caracteres)', () => {
    const tooLong = 'a'.repeat(501);
    const plan = { type: 'regular', temperature: 23, humidity: 60, luminosity: 15000, duration: 30, justification: tooLong };
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Justificação deve ter entre 10 e 500 caracteres');
  });

  // --- TESTES DE VALORES LIMITE (6.1.2) ---

  // Temperatura [18, 28]
  test('Deve rejeitar temperatura no limite inferior inválido (17)', () => {
    const plan = { type: 'regular', temperature: 17, humidity: 60, luminosity: 15000, duration: 30 };
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Temperatura fora do intervalo permitido');
  });

  test('Deve aceitar temperatura no limite superior válido (28)', () => {
    const plan = { type: 'regular', temperature: 28, humidity: 60, luminosity: 15000, duration: 30 };
    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  // Humidade [40, 80]
  test('Deve rejeitar humidade no limite inferior inválido (39)', () => {
    const plan = { type: 'regular', temperature: 23, humidity: 39, luminosity: 15000, duration: 30 };
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Humidade fora do intervalo permitido');
  });

  test('Deve rejeitar humidade no limite superior inválido (81)', () => {
    const plan = { type: 'regular', temperature: 23, humidity: 81, luminosity: 15000, duration: 30 };
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Humidade fora do intervalo permitido');
  });

  // Luminosidade [5000, 25000]
  test('Deve rejeitar luminosidade no limite inferior inválido (4999)', () => {
    const plan = { type: 'regular', temperature: 23, humidity: 60, luminosity: 4999, duration: 30 };
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Luminosidade fora do intervalo permitido');
  });

  test('Deve rejeitar luminosidade no limite superior inválido (25001)', () => {
    const plan = { type: 'regular', temperature: 23, humidity: 60, luminosity: 25001, duration: 30 };
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Luminosidade fora do intervalo permitido');
  });

  // --- TESTES DE CAIXA-BRANCA: MC/DC (6.2.1) ---
  // Requisito: Provar que cada condição afeta o resultado independentemente

  test('MC/DC: Não deve exigir autorização se o plano NÃO for pontual (mesmo que authorized seja false)', () => {
    const plan = {
      type: 'emergencia', // Mudando apenas o tipo para não-pontual
      temperature: 23,
      humidity: 60,
      luminosity: 15000,
      duration: 30,
      authorizedByResponsible: false // Continua false, mas deve ser válido
    };
    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
  });

  test('MC/DC: Deve ser válido se for pontual E tiver autorização', () => {
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

  // --- TESTES DE PARTICIONAMENTO DE EQUIVALÊNCIA (6.1.1) ---

  test('Deve rejeitar plano quando o tipo é nulo ou vazio', () => {
    const plan = { type: '', temperature: 23, humidity: 60, luminosity: 15000, duration: 30 };
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Tipo de plano inválido');
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

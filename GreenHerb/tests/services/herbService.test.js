const { validateHerb } = require('../../src/services/herbService');

describe('GREENHERB - Testes de Unidade - Herb Service', () => {

  // =====================================
  // Base válida
  // =====================================

  const validBase = {
    name: 'Hortelã',
    temperature: 23,
    humidity: 60,
    luminosity: 15000,
    cycleDays: 90
  };

  // =====================================
  // Erva válida
  // =====================================

  test('Deve validar uma erva aromática completa e válida', () => {

    const result =
      validateHerb(validBase);

    expect(result.valid).toBe(true);

    expect(result.errors.length).toBe(0);

  });

  // =====================================
  // Duração do ciclo [1, 365]
  // =====================================

  test('Deve rejeitar duração abaixo do limite (0)', () => {

    const result = validateHerb({
      ...validBase,
      cycleDays: 0
    });

    expect(result.valid).toBe(false);

  });

  test('Deve aceitar duração no limite mínimo (1)', () => {

    const result = validateHerb({
      ...validBase,
      cycleDays: 1
    });

    expect(result.valid).toBe(true);

  });

  test('Deve aceitar duração no limite máximo (365)', () => {

    const result = validateHerb({
      ...validBase,
      cycleDays: 365
    });

    expect(result.valid).toBe(true);

  });

  test('Deve rejeitar duração acima do limite (366)', () => {

    const result = validateHerb({
      ...validBase,
      cycleDays: 366
    });

    expect(result.valid).toBe(false);

  });

  // =====================================
  // MCC
  // =====================================

  test('Deve detetar múltiplos erros simultâneos', () => {

    const herb = {
      name: '',
      temperature: 10,
      humidity: 90,
      luminosity: 1000,
      cycleDays: 400

    };

    const result =
      validateHerb(herb);

    expect(result.valid).toBe(false);

    expect(result.errors.length).toBe(5);

  });

  // =====================================
  // Nome
  // =====================================

  test('Deve rejeitar erva sem nome', () => {

    const result = validateHerb({
      ...validBase,
      name: ''

    });

    expect(result.valid).toBe(false);

    expect(result.errors)
      .toContain('Nome da erva é obrigatório');

  });

  // =====================================
  // Temperatura [18, 28]
  // =====================================

  test('Deve rejeitar temperatura abaixo do limite mínimo (17)', () => {

    const result = validateHerb({
      ...validBase,
      temperature: 17

    });

    expect(result.valid).toBe(false);

  });

  test('Deve aceitar temperatura no limite mínimo (18)', () => {

    const result = validateHerb({
      ...validBase,
      temperature: 18

    });

    expect(result.valid).toBe(true);

  });

  test('Deve aceitar temperatura nominal (23)', () => {

    const result = validateHerb({
      ...validBase,
      temperature: 23

    });

    expect(result.valid).toBe(true);

  });

  test('Deve aceitar temperatura no limite máximo (28)', () => {

    const result = validateHerb({
      ...validBase,
      temperature: 28

    });

    expect(result.valid).toBe(true);

  });

  test('Deve rejeitar temperatura acima do limite máximo (29)', () => {

    const result = validateHerb({
      ...validBase,
      temperature: 29

    });

    expect(result.valid).toBe(false);

  });

  // =====================================
  // Humidade [40, 80]
  // =====================================

  test('Deve rejeitar humidade abaixo do limite mínimo (39)', () => {

    const result = validateHerb({
      ...validBase,
      humidity: 39

    });

    expect(result.valid).toBe(false);

  });

  test('Deve aceitar humidade no limite mínimo (40)', () => {

    const result = validateHerb({
      ...validBase,
      humidity: 40

    });

    expect(result.valid).toBe(true);

  });

  test('Deve aceitar humidade nominal (60)', () => {

    const result = validateHerb({
      ...validBase,
      humidity: 60

    });

    expect(result.valid).toBe(true);

  });

  test('Deve aceitar humidade no limite máximo (80)', () => {

    const result = validateHerb({
      ...validBase,
      humidity: 80

    });

    expect(result.valid).toBe(true);

  });

  test('Deve rejeitar humidade acima do limite máximo (81)', () => {

    const result = validateHerb({
      ...validBase,
      humidity: 81

    });

    expect(result.valid).toBe(false);

  });

  // =====================================
  // Luminosidade [5000, 25000]
  // =====================================

  test('Deve rejeitar luminosidade abaixo do limite mínimo (4999)', () => {

    const result = validateHerb({
      ...validBase,
      luminosity: 4999

    });

    expect(result.valid).toBe(false);

  });

  test('Deve aceitar luminosidade no limite mínimo (5000)', () => {

    const result = validateHerb({
      ...validBase,
      luminosity: 5000

    });

    expect(result.valid).toBe(true);

  });

  test('Deve aceitar luminosidade nominal (15000)', () => {

    const result = validateHerb({
      ...validBase,
      luminosity: 15000

    });

    expect(result.valid).toBe(true);

  });

  test('Deve aceitar luminosidade no limite máximo (25000)', () => {

    const result = validateHerb({
      ...validBase,
      luminosity: 25000

    });

    expect(result.valid).toBe(true);

  });

  test('Deve rejeitar luminosidade acima do limite máximo (25001)', () => {

    const result = validateHerb({
      ...validBase,
      luminosity: 25001

    });

    expect(result.valid).toBe(false);

  });

});
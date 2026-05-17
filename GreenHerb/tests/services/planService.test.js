const { validatePlan } = require('../../src/services/planService');

describe('GREENHERB - Unit Tests - Plan Service', () => {

  // =====================================================
  // BASE VÁLIDA
  // =====================================================

  const validPlan = {
    type: 'regular',
    temperature: 23,
    humidity: 60,
    luminosity: 15000,
    duration: 90,
    authorizedByResponsible: false
  };

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // TIPO DE PLANO
  // =====================================================

  describe('Validação do Tipo de Plano', () => {

    test('Deve aceitar plano regular válido', () => {

      const result = validatePlan(validPlan);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar plano de emergência válido', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'emergencia'
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar plano pontual com autorização', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'pontual',
        authorizedByResponsible: true
      });

      expect(result.valid).toBe(true);

    });

    test('Não deve exigir autorização para plano não pontual', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'emergencia',
        authorizedByResponsible: false
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar tipo de plano inválido', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'experimental'
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de plano inválido'
      );

    });

    test('Deve rejeitar tipo vazio', () => {

      const result = validatePlan({
        ...validPlan,
        type: ''
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de plano inválido'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE
  // TEMPERATURA [18, 28]
  // =====================================================

  describe('Valores Limite - Temperatura', () => {

    test('Deve rejeitar temperatura abaixo do limite (17)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 17
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Temperatura fora do intervalo permitido'
      );

    });

    test('Deve aceitar temperatura no limite mínimo (18)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 18
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar temperatura nominal (23)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 23
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar temperatura no limite máximo (28)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 28
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar temperatura acima do limite (29)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 29
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Temperatura fora do intervalo permitido'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE
  // HUMIDADE [40, 80]
  // =====================================================

  describe('Valores Limite - Humidade', () => {

    test('Deve rejeitar humidade abaixo do limite (39)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 39
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Humidade fora do intervalo permitido'
      );

    });

    test('Deve aceitar humidade no limite mínimo (40)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 40
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar humidade nominal (60)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 60
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar humidade no limite máximo (80)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 80
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar humidade acima do limite (81)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 81
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Humidade fora do intervalo permitido'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE
  // LUMINOSIDADE [5000, 25000]
  // =====================================================

  describe('Valores Limite - Luminosidade', () => {

    test('Deve rejeitar luminosidade abaixo do limite (4999)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 4999
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Luminosidade fora do intervalo permitido'
      );

    });

    test('Deve aceitar luminosidade no limite mínimo (5000)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 5000
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar luminosidade nominal (15000)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 15000
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar luminosidade no limite máximo (25000)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 25000
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar luminosidade acima do limite (25001)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 25001
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Luminosidade fora do intervalo permitido'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE
  // DURAÇÃO [1, 365]
  // =====================================================

  describe('Valores Limite - Duração', () => {

    test('Deve rejeitar duração abaixo do limite (0)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 0
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Duração fora do intervalo permitido'
      );

    });

    test('Deve aceitar duração no limite mínimo (1)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 1
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar duração nominal (90)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 90
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar duração no limite máximo (365)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 365
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar duração acima do limite (366)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 366
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Duração fora do intervalo permitido'
      );

    });

  });

  // =====================================================
  // CONDIÇÕES MÚLTIPLAS / MC/DC
  // =====================================================

  describe('MC/DC - Planos Pontuais', () => {

    test('Deve rejeitar plano pontual sem autorização', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'pontual',
        authorizedByResponsible: false
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Plano pontual exige autorização'
      );

    });

    test('Deve rejeitar plano pontual sem autorização e com temperatura inválida', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'pontual',
        temperature: 30,
        authorizedByResponsible: false
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Plano pontual exige autorização'
      );

      expect(result.errors).toContain(
        'Temperatura fora do intervalo permitido'
      );

    });

  });

});
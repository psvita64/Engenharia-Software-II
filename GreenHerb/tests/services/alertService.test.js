const { classifyAlert } = require('../../src/services/alertService');

describe('GREENHERB - Unit Tests - Alert Service', () => {

  const limits = {
    minT: 18,
    maxT: 28,
    minH: 40,
    maxH: 80
  };

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // LIMITES
  // =====================================================

  describe('Validação de Limites', () => {

    test('Deve rejeitar limites undefined', () => {

      const result = classifyAlert(
        23,
        60,
        undefined,
        true
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Limites não definidos'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // SENSOR
  // =====================================================

  describe('Validação do Sensor', () => {

    test('Deve rejeitar sensor undefined', () => {

      const result = classifyAlert(
        23,
        60,
        limits,
        undefined
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Estado do sensor inválido'
      );

    });

    test('Deve rejeitar sensor não booleano', () => {

      const result = classifyAlert(
        23,
        60,
        limits,
        'true'
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Estado do sensor inválido'
      );

    });

  });

  // =====================================================
  // ANÁLISE DE VALORES LIMITE
  // TEMPERATURA
  // =====================================================

  describe('Valores Limite - Temperatura', () => {

    test('Deve classificar como Normal no limite mínimo (18)', () => {

      const result = classifyAlert(
        18,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Normal');

    });

    test('Deve classificar como Normal no valor nominal (23)', () => {

      const result = classifyAlert(
        23,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Normal');

    });

    test('Deve classificar como Normal no limite máximo (28)', () => {

      const result = classifyAlert(
        28,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Normal');

    });

    test('Deve classificar como Aviso acima do limite máximo (29)', () => {

      const result = classifyAlert(
        29,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Aviso');

    });

    test('Deve classificar como Crítico muito acima do limite máximo (34)', () => {

      const result = classifyAlert(
        34,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Crítico');

    });

  });

  // =====================================================
  // ANÁLISE DE VALORES LIMITE
  // HUMIDADE
  // =====================================================

  describe('Valores Limite - Humidade', () => {

    test('Deve classificar como Normal no limite mínimo (40)', () => {

      const result = classifyAlert(
        23,
        40,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Normal');

    });

    test('Deve classificar como Normal no valor nominal (60)', () => {

      const result = classifyAlert(
        23,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Normal');

    });

    test('Deve classificar como Normal no limite máximo (80)', () => {

      const result = classifyAlert(
        23,
        80,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Normal');

    });

    test('Deve classificar como Aviso abaixo do limite mínimo (39)', () => {

      const result = classifyAlert(
        23,
        39,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Aviso');

    });

    test('Deve classificar como Crítico muito abaixo do limite mínimo (19)', () => {

      const result = classifyAlert(
        23,
        19,
        limits,
        true
      );

      expect(result.valid).toBe(true);
      expect(result.severity).toBe('Crítico');

    });

  });

  // =====================================================
  // MC/DC E CONDIÇÕES MÚLTIPLAS
  // =====================================================

  describe('MC/DC - Classificação de Alertas', () => {

    test('Deve retornar Informativo quando sensor está desligado', () => {

      const result = classifyAlert(
        35,
        10,
        limits,
        false
      );

      expect(result.valid).toBe(true);

      expect(result.severity).toBe(
        'Informativo'
      );

    });

    test('Deve retornar Normal quando temperatura e humidade estão corretas', () => {

      const result = classifyAlert(
        23,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);

      expect(result.severity).toBe(
        'Normal'
      );

    });

    test('Deve retornar Aviso quando apenas temperatura está fora dos limites', () => {

      const result = classifyAlert(
        29,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);

      expect(result.severity).toBe(
        'Aviso'
      );

    });

    test('Deve retornar Aviso quando apenas humidade está fora dos limites', () => {

      const result = classifyAlert(
        23,
        39,
        limits,
        true
      );

      expect(result.valid).toBe(true);

      expect(result.severity).toBe(
        'Aviso'
      );

    });

    test('Deve retornar Crítico quando temperatura ultrapassa limite crítico', () => {

      const result = classifyAlert(
        40,
        60,
        limits,
        true
      );

      expect(result.valid).toBe(true);

      expect(result.severity).toBe(
        'Crítico'
      );

    });

    test('Deve retornar Crítico quando humidade ultrapassa limite crítico', () => {

      const result = classifyAlert(
        23,
        10,
        limits,
        true
      );

      expect(result.valid).toBe(true);

      expect(result.severity).toBe(
        'Crítico'
      );

    });

  });

});
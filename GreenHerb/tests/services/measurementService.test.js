const { validateMeasurement } = require('../../src/services/measurementService');

describe('GREENHERB - Unit Tests - Measurement Service', () => {

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // SENSOR ID
  // =====================================================

  describe('Validação do Sensor ID', () => {

    test('Deve aceitar sensorId válido', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar sensorId vazio', () => {

      const measurement = {
        sensorId: '',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'SensorId é obrigatório'
      );

    });

    test('Deve rejeitar sensorId undefined', () => {

      const measurement = {
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'SensorId é obrigatório'
      );

    });

    test('Deve rejeitar sensorId apenas com espaços', () => {

      const measurement = {
        sensorId: '   ',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'SensorId é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // TIPO DE MEDIÇÃO
  // =====================================================

  describe('Validação do Tipo de Medição', () => {

    test('Deve aceitar tipo de medição válido', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'humidade',
        value: 60,
        unit: '%',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar tipo vazio', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: '',
        value: 60,
        unit: '%',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de medição é obrigatório'
      );

    });

    test('Deve rejeitar tipo undefined', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        value: 60,
        unit: '%',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de medição é obrigatório'
      );

    });

    test('Deve rejeitar tipo apenas com espaços', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: '   ',
        value: 60,
        unit: '%',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de medição é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // VALOR DA MEDIÇÃO
  // =====================================================

  describe('Validação do Valor da Medição', () => {

    test('Deve aceitar valor numérico inteiro', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar valor numérico decimal', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'temperatura',
        value: 23.5,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar valor string', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'temperatura',
        value: '23',
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Valor da medição deve ser numérico'
      );

    });

    test('Deve rejeitar valor undefined', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'temperatura',
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Valor da medição deve ser numérico'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // UNIDADE DE MEDIÇÃO
  // =====================================================

  describe('Validação da Unidade de Medição', () => {

    test('Deve aceitar unidade válida', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'luminosidade',
        value: 15000,
        unit: 'lux',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar unidade vazia', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'luminosidade',
        value: 15000,
        unit: '',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Unidade de medição é obrigatória'
      );

    });

    test('Deve rejeitar unidade undefined', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'luminosidade',
        value: 15000,
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Unidade de medição é obrigatória'
      );

    });

    test('Deve rejeitar unidade apenas com espaços', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'luminosidade',
        value: 15000,
        unit: '   ',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Unidade de medição é obrigatória'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // TIMESTAMP
  // =====================================================

  describe('Validação do Timestamp', () => {

    test('Deve aceitar timestamp válido', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar timestamp inválido', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: 'timestamp-invalido'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Timestamp inválido'
      );

    });

    test('Deve rejeitar timestamp undefined', () => {

      const measurement = {
        sensorId: 'SENSOR-01',
        type: 'temperatura',
        value: 23,
        unit: '°C'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Timestamp inválido'
      );

    });

  });

  // =====================================================
  // MC/DC E CONDIÇÕES MÚLTIPLAS
  // =====================================================

  describe('MC/DC - Sensor ID', () => {

    test('Deve rejeitar sensorId undefined', () => {

      const measurement = {
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'SensorId é obrigatório'
      );

    });

    test('Deve rejeitar sensorId vazio', () => {

      const measurement = {
        sensorId: '',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'SensorId é obrigatório'
      );

    });

    test('Deve rejeitar sensorId apenas com espaços', () => {

      const measurement = {
        sensorId: '   ',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'SensorId é obrigatório'
      );

    });

    test('Deve aceitar sensorId válido', () => {

      const measurement = {
        sensorId: 'SENSOR-99',
        type: 'temperatura',
        value: 23,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateMeasurement(
        measurement
      );

      expect(result.valid).toBe(true);

    });

  });

});
const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de endpoint /measurements', () => {
  test('Deve registrar uma medição válida', async () => {
    const response = await request(app)
      .post('/measurements')
      .send({
        sensorId: 'sensor-1',
        type: 'temperatura',
        value: 24.5,
        unit: '°C',
        timestamp: '2026-05-01T12:00:00Z'
      });

    expect(response.status).toBe(201);
    expect(response.body.measurement.sensorId).toBe('sensor-1');
  });

  test('Deve rejeitar medição sem sensorId', async () => {
    const response = await request(app)
      .post('/measurements')
      .send({
        type: 'humidade',
        value: 55,
        unit: '%',
        timestamp: '2026-05-01T12:00:00Z'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('SensorId é obrigatório');
  });

  test('Deve rejeitar medição com valor não numérico', async () => {
    const response = await request(app)
      .post('/measurements')
      .send({
        sensorId: 'sensor-1',
        type: 'humidade',
        value: 'não-numérico',
        unit: '%',
        timestamp: '2026-05-01T12:00:00Z'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Valor da medição deve ser numérico');
  });

  test('Deve rejeitar medição com timestamp inválido', async () => {
    const response = await request(app)
      .post('/measurements')
      .send({
        sensorId: 'sensor-1',
        type: 'humidade',
        value: 55,
        unit: '%',
        timestamp: 'data-invalida'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Timestamp inválido');
  });
});

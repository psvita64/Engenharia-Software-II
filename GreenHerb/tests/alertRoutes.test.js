const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de endpoint /alerts', () => {
  const limits = { minT: 18, maxT: 28, minH: 40, maxH: 80 };

  test('Deve classificar alerta como Normal', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 24,
        humidity: 60,
        limits,
        sensorOK: true
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Normal');
  });

  test('Deve classificar alerta como Aviso', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 29,
        humidity: 60,
        limits,
        sensorOK: true
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Aviso');
  });

  test('Deve classificar alerta como Crítico por temperatura', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 34,
        humidity: 60,
        limits,
        sensorOK: true
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Crítico');
  });

  test('Deve classificar alerta como Crítico por humidade', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 24,
        humidity: 10,
        limits,
        sensorOK: true
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Crítico');
  });

  test('Deve classificar alerta como Informativo quando sensor está com problema', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 50,
        humidity: 10,
        limits,
        sensorOK: false
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Informativo');
  });

  test('Deve rejeitar alerta sem limites', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 25,
        humidity: 55,
        sensorOK: true
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Limites são obrigatórios');
  });
});

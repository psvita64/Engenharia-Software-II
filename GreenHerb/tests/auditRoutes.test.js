const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de endpoint /audit', () => {
  test('Deve registar uma entrada de auditoria válida', async () => {
    const response = await request(app)
      .post('/audit')
      .send({
        userId: 1,
        event: 'Criação de plano',
        timestamp: '2026-05-01T12:00:00Z'
      });

    expect(response.status).toBe(201);
    expect(response.body.auditEntry.userId).toBe(1);
  });

  test('Deve rejeitar entrada sem userId', async () => {
    const response = await request(app)
      .post('/audit')
      .send({
        event: 'Criação de plano',
        timestamp: '2026-05-01T12:00:00Z'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('userId é obrigatório');
  });

  test('Deve rejeitar entrada sem evento', async () => {
    const response = await request(app)
      .post('/audit')
      .send({
        userId: 1,
        timestamp: '2026-05-01T12:00:00Z'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Evento é obrigatório');
  });

  test('Deve rejeitar entrada com timestamp inválido', async () => {
    const response = await request(app)
      .post('/audit')
      .send({
        userId: 1,
        event: 'Criação de plano',
        timestamp: 'invalid-date'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Timestamp inválido');
  });
});

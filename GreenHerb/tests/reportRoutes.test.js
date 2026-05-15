const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de endpoint /reports', () => {
  test('Deve gerar relatório válido', async () => {
    const response = await request(app)
      .post('/reports')
      .send({
        type: 'weekly',
        from: '2026-05-01',
        to: '2026-05-07'
      });

    expect(response.status).toBe(200);
    expect(response.body.report.type).toBe('weekly');
  });

  test('Deve rejeitar relatório com tipo inválido', async () => {
    const response = await request(app)
      .post('/reports')
      .send({
        type: 'yearly',
        from: '2026-05-01',
        to: '2026-05-07'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Tipo de relatório inválido');
  });

  test('Deve rejeitar relatório com data inicial inválida', async () => {
    const response = await request(app)
      .post('/reports')
      .send({
        type: 'weekly',
        from: 'invalid-date',
        to: '2026-05-07'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Data inicial inválida');
  });

  test('Deve rejeitar relatório com data final inválida', async () => {
    const response = await request(app)
      .post('/reports')
      .send({
        type: 'weekly',
        from: '2026-05-01',
        to: 'invalid-date'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Data final inválida');
  });

  test('Deve rejeitar relatório com intervalo de datas inválido', async () => {
    const response = await request(app)
      .post('/reports')
      .send({
        type: 'weekly',
        from: '2026-05-10',
        to: '2026-05-01'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Intervalo de datas inválido');
  });
});

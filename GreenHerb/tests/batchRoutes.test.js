const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de endpoint /batches', () => {
  test('Deve criar um lote válido', async () => {
    const response = await request(app)
      .post('/batches')
      .send({
        name: 'Lote Teste',
        crop: 'Manjericão',
        startDate: '2026-05-01',
        expectedDuration: 60,
        status: 'planejado'
      });

    expect(response.status).toBe(201);
    expect(response.body.batch.name).toBe('Lote Teste');
  });

  test('Deve rejeitar lote sem nome', async () => {
    const response = await request(app)
      .post('/batches')
      .send({
        crop: 'Alecrim',
        startDate: '2026-05-01',
        expectedDuration: 60,
        status: 'planejado'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Nome do lote é obrigatório');
  });

  test('Deve rejeitar lote com data de início inválida', async () => {
    const response = await request(app)
      .post('/batches')
      .send({
        name: 'Lote Falha',
        crop: 'Alecrim',
        startDate: 'não é data',
        expectedDuration: 60,
        status: 'planejado'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Data de início inválida');
  });

  test('Deve rejeitar lote com duração esperada inválida', async () => {
    const response = await request(app)
      .post('/batches')
      .send({
        name: 'Lote Falha',
        crop: 'Alecrim',
        startDate: '2026-05-01',
        expectedDuration: 0,
        status: 'planejado'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Duração esperada inválida');
  });

  test('Deve rejeitar lote com status inválido', async () => {
    const response = await request(app)
      .post('/batches')
      .send({
        name: 'Lote Falha',
        crop: 'Alecrim',
        startDate: '2026-05-01',
        expectedDuration: 30,
        status: 'desconhecido'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Status do lote inválido');
  });
});

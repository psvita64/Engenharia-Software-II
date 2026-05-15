const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de endpoint /plans', () => {
  test('Deve criar um plano regular válido', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        type: 'regular',
        temperature: 23,
        humidity: 60,
        luminosity: 15000,
        duration: 90,
        justification: 'Plano válido para teste'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Plano de cultivo criado com sucesso!');
    expect(response.body.plan.type).toBe('regular');
  });

  test('Deve rejeitar plano com tipo inválido', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        type: 'experimental',
        temperature: 23,
        humidity: 60,
        luminosity: 15000,
        duration: 90
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Tipo de plano inválido');
  });

  test('Deve rejeitar plano com temperatura fora do intervalo', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        type: 'regular',
        temperature: 17,
        humidity: 60,
        luminosity: 15000,
        duration: 90
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Temperatura fora do intervalo permitido');
  });

  test('Deve rejeitar plano com humidade fora do intervalo', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        type: 'regular',
        temperature: 23,
        humidity: 39,
        luminosity: 15000,
        duration: 90
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Humidade fora do intervalo permitido');
  });

  test('Deve rejeitar plano pontual sem autorização', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        type: 'pontual',
        temperature: 23,
        humidity: 60,
        luminosity: 15000,
        duration: 30,
        authorizedByResponsible: false
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Plano pontual exige autorização');
  });

  test('Deve aceitar plano pontual com autorização', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        type: 'pontual',
        temperature: 23,
        humidity: 60,
        luminosity: 15000,
        duration: 30,
        authorizedByResponsible: true
      });

    expect(response.status).toBe(201);
    expect(response.body.plan.type).toBe('pontual');
  });

  test('Deve rejeitar plano com justificação curta', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        type: 'regular',
        temperature: 23,
        humidity: 60,
        luminosity: 15000,
        duration: 30,
        justification: 'curta'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Justificação deve ter entre 10 e 500 caracteres');
  });
});

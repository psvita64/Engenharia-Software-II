const request = require('supertest');
const app = require('../src/app');

describe('Testes de Autenticação e Perfis - Sprint 1 (Versão Email)', () => {


  test('Deve permitir login com email e password válidos (Classe Válida)', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@greenherb.com', password: '123' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Deve rejeitar email sem o símbolo @ (Classe Inválida)', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin_at_greenherb.com', password: '123' });
    
    expect(res.statusCode).toEqual(400); // Bad Request devido à validação de formato
    expect(res.body.error).toContain("Formato de email inválido");
  });

  test('Deve rejeitar email com espaços (Classe Inválida)', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin @greenherb.com', password: '123' });
    
    expect(res.statusCode).toEqual(400);
  });

  test('Deve rejeitar login com password errada (Classe Inválida)', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@greenherb.com', password: 'wrong' });
    
    expect(res.statusCode).toEqual(401); // Unauthorized [cite: 157]
  });

  /**
   * TESTES DE INTEGRAÇÃO: CONTROLO DE ACESSO
   * Técnica: Particionamento de Equivalência (Perfis) [cite: 50, 97]
   */

  test('Administrador deve poder aceder à criação de utilizadores (201 Created)', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@greenherb.com', password: '123' });

    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({ email: 'novo@greenherb.com', role: 'Técnico' });

    expect(res.statusCode).toEqual(201);
  });

  test('Técnico não deve poder criar utilizadores (403 Forbidden)', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'tech@greenherb.com', password: '123' });

    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({ email: 'novo@greenherb.com', role: 'Técnico' });

    expect(res.statusCode).toEqual(403); // Acesso Negado [cite: 157]
  });

  test('Deve rejeitar acesso sem token (401 Unauthorized)', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'novo@greenherb.com', role: 'Técnico' });

    expect(res.statusCode).toEqual(401); // Token ausente [cite: 157]
  });
});
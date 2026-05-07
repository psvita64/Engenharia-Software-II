const request = require('supertest');
const app = require('../src/app');

describe('Testes de Autenticação e Perfis (Sprint 1)', () => {

  // Teste de Unidade/Integração para Login (Particionamento de Equivalência) [cite: 157]
  test('Deve permitir login com credenciais válidas (Classe Válida)', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: '123' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Deve rejeitar login com password errada (Classe Inválida)', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: 'wrong' });
    
    expect(res.statusCode).toEqual(401); // [cite: 157]
  });

  // Teste de Controlo de Acesso por Perfil [cite: 50, 157]
  test('Técnico não deve poder criar utilizadores (403 Forbidden)', async () => {
    // Primeiro faz login como Técnico para obter token
    const login = await request(app)
      .post('/auth/login')
      .send({ username: 'tech', password: '123' });

    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({ username: 'novo_user', role: 'Técnico' });

    expect(res.statusCode).toEqual(403); // [cite: 157]
  });
});
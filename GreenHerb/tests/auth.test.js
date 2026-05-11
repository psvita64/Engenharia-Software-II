const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

describe('Testes de Autenticação e Autorização', () => {

  // TESTES DE AUTENTICAÇÃO
  describe('POST /auth/login', () => {
    //Email
    test('Deve permitir login com email e password válidos (Classe Válida)', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@greenherb.com', password: '123' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    test('Deve rejeitar email inexistente', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'naoexiste@greenherb.com', password: '123' });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Email inexistente');
    });

    test('Deve rejeitar email vazio', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: '', password: '123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Email obrigatório');
    });

    test('Deve rejeitar email com caracteres inválidos', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@@greenherb', password: '123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Formato de email inválido');
    });

    test('Deve rejeitar email sem o símbolo @ (Classe Inválida)', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin_at_greenherb.com', password: '123' });
      
      expect(res.statusCode).toEqual(400); // Bad Request devido à validação de formato
      expect(res.body.error).toContain("Formato de email inválido");
    });

    test('Deve rejeitar email nulo', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: null, password: '123'});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Email obrigatório');
    });

    test('Deve rejeitar email com espaços (Classe Inválida)', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin @greenherb.com', password: '123' });
      
      expect(res.statusCode).toEqual(400);
    });

    //Password
    test('Deve rejeitar login com password errada (Classe Inválida)', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@greenherb.com', password: 'wrong' });
      
      expect(res.statusCode).toEqual(401); // Unauthorized [cite: 157]
    });

    test('Deve rejeitar password vazia', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@greenherb.com', password: ''});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Password obrigatória');
    });

    test('Deve rejeitar password apenas com espaços', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@greenherb.com', password: '   ' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Password obrigatória');
    });

    test('Deve rejeitar password nula', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@greenherb.com', password: null });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Password obrigatória');
    });

    test('Deve rejeitar email e password inválidos', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'emailinvalido', password: 'errada' });

      expect(res.statusCode).toBe(400);
    });

    test('Token deve conter identificador do utilizador e UUID', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'admin@greenherb.com', password: '123' });

      const decoded = jwt.decode(res.body.token);

      expect(decoded).toHaveProperty('id');
      expect(decoded).toHaveProperty('sessionId');
      expect(decoded).toHaveProperty('role');
    });
  });

  // TESTES DE AUTORIZAÇÃO
  describe('POST /users', () => {

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

    test('Deve rejeitar token inválido', async () => {
      const res = await request(app)
        .post('/users')
        .set('Authorization', 'Bearer tokeninvalido')
        .send({ email: 'novo@greenherb.com', role: 'Técnico' });

      expect(res.statusCode).toBe(401);
    });
    
  });
});
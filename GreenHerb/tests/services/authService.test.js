const jwt = require('jsonwebtoken');

const { loginUser, SECRET_KEY } = require('../../src/services/authService');

describe('GREENHERB - Unit Tests - Auth Service', () => {

  // =====================================
  // TESTES DE LOGIN VÁLIDO
  // =====================================

  test('Deve permitir login com credenciais válidas', () => {

    const result = loginUser(
      'admin@greenherb.com',
      '123'
    );

    expect(result.valid).toBe(true);

    expect(result).toHaveProperty('token');

  });

  // =====================================
  // TESTES DE EMAIL
  // =====================================

  test('Deve rejeitar email inexistente', () => {

    const result = loginUser(
      'naoexiste@greenherb.com',
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(401);

    expect(result.error)
      .toBe('Email inexistente');

  });

  test('Deve rejeitar email vazio', () => {

    const result = loginUser(
      '',
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Email obrigatório');

  });

  test('Deve rejeitar email nulo', () => {

    const result = loginUser(
      null,
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Email obrigatório');

  });

  test('Deve rejeitar email undefined', () => {

    const result = loginUser(
      undefined,
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Email obrigatório');

  });

  test('Deve rejeitar email apenas com espaços', () => {

    const result = loginUser(
      '   ',
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Email obrigatório');

  });

  test('Deve rejeitar email com formato inválido', () => {

    const result = loginUser(
      'admin@@greenherb',
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Formato de email inválido');

  });

  test('Deve rejeitar email sem símbolo @', () => {

    const result = loginUser(
      'admin_greenherb.com',
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Formato de email inválido');

  });

  test('Deve rejeitar email com espaços internos', () => {

    const result = loginUser(
      'admin @greenherb.com',
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Formato de email inválido');

  });

  test('Deve rejeitar email que não seja string', () => {

    const result = loginUser(
      12345,
      '123'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Email obrigatório');

  });

  // =====================================
  // TESTES DE PASSWORD
  // =====================================

  test('Deve rejeitar password incorreta', () => {

    const result = loginUser(
      'admin@greenherb.com',
      'wrong'
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(401);

    expect(result.error)
      .toBe('Password incorreta');

  });

  test('Deve rejeitar password vazia', () => {

    const result = loginUser(
      'admin@greenherb.com',
      ''
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Password obrigatória');

  });

  test('Deve rejeitar password nula', () => {

    const result = loginUser(
      'admin@greenherb.com',
      null
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Password obrigatória');

  });

  test('Deve rejeitar password undefined', () => {

    const result = loginUser(
      'admin@greenherb.com',
      undefined
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Password obrigatória');

  });

  test('Deve rejeitar password apenas com espaços', () => {

    const result = loginUser(
      'admin@greenherb.com',
      '   '
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Password obrigatória');

  });

  test('Deve rejeitar password que não seja string', () => {

    const result = loginUser(
      'admin@greenherb.com',
      12345
    );

    expect(result.valid).toBe(false);

    expect(result.status).toBe(400);

    expect(result.error)
      .toBe('Password obrigatória');

  });

  // =====================================
  // TESTES DE JWT
  // =====================================

  test('Token JWT deve conter id, role e sessionId', () => {

    const result = loginUser(
      'admin@greenherb.com',
      '123'
    );

    const decoded =
      jwt.verify(
        result.token,
        SECRET_KEY
      );

    expect(decoded)
      .toHaveProperty('id');

    expect(decoded)
      .toHaveProperty('role');

    expect(decoded)
      .toHaveProperty('sessionId');

  });

  test('Token JWT deve conter role Administrador', () => {

    const result = loginUser(
      'admin@greenherb.com',
      '123'
    );

    const decoded =
      jwt.verify(
        result.token,
        SECRET_KEY
      );

    expect(decoded.role)
      .toBe('Administrador');

  });

  test('Token JWT deve conter id correto', () => {

    const result = loginUser(
      'admin@greenherb.com',
      '123'
    );

    const decoded =
      jwt.verify(
        result.token,
        SECRET_KEY
      );

    expect(decoded.id)
      .toBe(1);

  });

});
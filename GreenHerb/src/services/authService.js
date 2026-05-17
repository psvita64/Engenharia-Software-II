const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const SECRET_KEY = 'greenherb_secret';

// =====================================
// Base de dados simulada
// =====================================

const users = [

  {
    id: 1,
    email: 'admin@greenherb.com',
    password: '123',
    role: 'Administrador'
  },

  {
    id: 2,
    email: 'tech@greenherb.com',
    password: '123',
    role: 'Técnico'
  }

];

// =====================================
// Validação de email
// =====================================

const validateEmail = (email) => {

  if (!email) {
    return false;
  }

  if (email.includes(' ')) {
    return false;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);

};

// =====================================
// Login
// =====================================

const loginUser = (email, password) => {

  // Email obrigatório

  if (
    email === null ||
    email === undefined ||
    typeof email !== 'string' ||
    email.trim() === ''
  ) {

    return {
      valid: false,
      status: 400,
      error: 'Email obrigatório'
    };

  }

  // Password obrigatória

  if (
    password === null ||
    password === undefined ||
    typeof password !== 'string' ||
    password.trim() === ''
  ) {

    return {
      valid: false,
      status: 400,
      error: 'Password obrigatória'
    };

  }

  // Formato do email

  if (!validateEmail(email)) {

    return {
      valid: false,
      status: 400,
      error: 'Formato de email inválido'
    };

  }

  // Procurar utilizador

  const user =
    users.find(u => u.email === email);

  if (!user) {

    return {
      valid: false,
      status: 401,
      error: 'Email inexistente'
    };

  }

  // Password incorreta

  if (user.password !== password) {

    return {
      valid: false,
      status: 401,
      error: 'Password incorreta'
    };

  }

  // Criar sessão

  const sessionId = uuidv4();
  const token = jwt.sign(
    {
        id: user.id,
        role: user.role,
        sessionId
    },
    SECRET_KEY,
    {
        expiresIn: '1h'
    }
  );

  return {
    valid: true,
    token
  };

};

module.exports = {
  loginUser,
  SECRET_KEY
};
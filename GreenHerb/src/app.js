const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const SECRET_KEY = "greenherb_secret";

// Base de dados simulada 
const users = [
  { id: 1, email: 'admin@greenherb.com', password: '123', role: 'Administrador' },
  { id: 2, email: 'tech@greenherb.com', password: '123', role: 'Técnico' }
];

//validacao de email
const validateEmail = (email) => {
  if (!email) return false;
  if (email.includes(' ')) return false; 
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Endpoint: Autenticação 
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validação do email
  if (email === null || email === undefined || email.trim() === '') {
    return res.status(400).json({
      error: "Email obrigatório"
    });
  }

  // Validação da password
  if (password === null || password === undefined || password.trim() === '') {
    return res.status(400).json({
      error: "Password obrigatória"
    });
  }

  // Formato do email
  if (!validateEmail(email)) {
    return res.status(400).json({
      error: "Formato de email inválido"
    });
  }

  // Procurar utilizador
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      error: "Email inexistente"
    });
  }
  
  // Validar password
  if (user.password !== password) {
    return res.status(401).json({
      error: "Password incorreta"
    });
  }

  // Criar UUID da sessão
  const sessionId = uuidv4();

  // Gerar token JWT
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      sessionId: sessionId
    },
    SECRET_KEY,
    {
      expiresIn: '1h'
    }
  );

  return res.status(200).json({ token });
});

// Middleware de autorização por perfil [cite: 39, 50]
const authorize = (roles = []) => {
  return (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        error: "Token ausente"
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Token ausente" });

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Acesso negado" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Token inválido ou expirado" });
    }
  };
};

// Endpoint: Gestão de utilizadores [cite: 35]
app.post('/users', authorize(['Administrador']), (req, res) => {
  res.status(201).json({ message: "Utilizador criado com sucesso" });
});

module.exports = app;
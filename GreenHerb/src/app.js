const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET_KEY = "greenherb_secret";

// Base de dados simulada (apenas para o Sprint 1)
const users = [
  { id: 1, username: 'admin', password: '123', role: 'Administrador' },
  { id: 2, username: 'tech', password: '123', role: 'Técnico' }
];

// Endpoint: Autenticação 
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware de autorização por perfil [cite: 39]
const authorize = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
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

// Endpoint: Gestão de utilizadores (Apenas Admin) [cite: 35, 97]
app.post('/users', authorize(['Administrador']), (req, res) => {
  res.status(201).json({ message: "Utilizador criado com sucesso" });
});

module.exports = app;
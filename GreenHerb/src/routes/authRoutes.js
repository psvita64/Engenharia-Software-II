const express = require('express');
const router = express.Router();
const { loginUser } = require('../services/authService');
const { authorize } = require('../middleware/authMiddleware');

// =====================================
// Login
// =====================================

router.post('/login', (req, res) => {

  const { email, password } = req.body;
  const result = loginUser(email, password);
  
  if (!result.valid) return res.status(result.status).json({ error: result.error });

  return res.status(200).json({ token: result.token });
});

// =====================================
// Gestão de utilizadores
// =====================================

router.post('/users', authorize(['Administrador']), (req, res) => {
    return res.status(201).json({ message: 'Utilizador criado com sucesso' });
  }
);

module.exports = router;
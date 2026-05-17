const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../services/authService');

// =====================================
// Middleware de autorização
// =====================================

const authorize = (roles = []) => {

  return (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token ausente' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token ausente' });

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      if ( roles.length && !roles.includes(decoded.role)) return res.status(403).json({ error: 'Acesso negado'});

      req.user = decoded;
      next();

    }catch (error) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  };
};

module.exports = {
  authorize
};
const express = require('express');
const router = express.Router();
const { validateAutomationRule } = require('../services/automationService');

router.post('/', (req, res) => {
  const rule = req.body;
  const validation = validateAutomationRule(rule);

  if (!validation.valid) {
    return res.status(400).json({ error: 'Regra de automação inválida', details: validation.errors });
  }

  res.status(201).json({ message: 'Regra de automação criada com sucesso!', rule });
});

module.exports = router;

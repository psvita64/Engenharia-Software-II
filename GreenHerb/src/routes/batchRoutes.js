const express = require('express');
const router = express.Router();
const { validateBatch } = require('../services/batchService');

router.post('/', (req, res) => {
  const batch = req.body;
  const validation = validateBatch(batch);

  if (!validation.valid) {
    return res.status(400).json({ error: 'Dados de lote inválidos', details: validation.errors });
  }

  res.status(201).json({ message: 'Lote criado com sucesso!', batch });
});

module.exports = router;

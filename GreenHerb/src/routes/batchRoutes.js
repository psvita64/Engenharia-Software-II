const express = require('express');
const router = express.Router();
const { validateBatch } = require('../services/batchService'); // CORRIGIDO: Import correto

router.post('/', (req, res) => {
  const batch = req.body; // CORRIGIDO: Nome semanticamente correto
  const validation = validateBatch(batch); // CORRIGIDO: Função correta

  if (!validation.valid) {
    return res.status(400).json({ error: 'Dados do lote inválidos', details: validation.errors });
  }

  res.status(201).json({ message: 'Lote criado com sucesso!', batch });
});

module.exports = router;

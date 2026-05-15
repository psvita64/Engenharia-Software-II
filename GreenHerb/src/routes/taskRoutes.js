const express = require('express');
const router = express.Router();
const { validateTask } = require('../services/taskService');

router.post('/', (req, res) => {
  const task = req.body;
  const validation = validateTask(task);

  if (!validation.valid) {
    return res.status(400).json({ error: 'Dados de tarefa inválidos', details: validation.errors });
  }

  res.status(201).json({ message: 'Tarefa criada com sucesso!', task });
});

module.exports = router;

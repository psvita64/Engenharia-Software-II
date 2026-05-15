const express = require('express');
const router = express.Router();
const { validateMeasurement } = require('../services/measurementService');

router.post('/', (req, res) => {
  const measurement = req.body;
  const validation = validateMeasurement(measurement);

  if (!validation.valid) {
    return res.status(400).json({ error: 'Dados de medição inválidos', details: validation.errors });
  }

  res.status(201).json({ message: 'Medição registada com sucesso!', measurement });
});

module.exports = router;

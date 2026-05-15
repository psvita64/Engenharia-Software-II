const express = require('express');
const router = express.Router();
const { classifyAlert } = require('../services/alertService');

router.post('/', (req, res) => {
  const { temperature, humidity, limits, sensorOK } = req.body;
  const errors = [];

  if (temperature === undefined || typeof temperature !== 'number') errors.push('Temperatura é obrigatória e deve ser numérica');
  if (humidity === undefined || typeof humidity !== 'number') errors.push('Humidade é obrigatória e deve ser numérica');
  if (!limits || typeof limits !== 'object') {
    errors.push('Limites são obrigatórios');
  } else {
    if (limits.minT === undefined || limits.maxT === undefined || limits.minH === undefined || limits.maxH === undefined) {
      errors.push('Limites devem incluir minT, maxT, minH e maxH');
    }
  }
  if (sensorOK === undefined || typeof sensorOK !== 'boolean') errors.push('sensorOK é obrigatório e deve ser booleano');

  if (errors.length) {
    return res.status(400).json({ error: 'Dados de alerta inválidos', details: errors });
  }

  const severity = classifyAlert(temperature, humidity, limits, sensorOK);
  res.status(200).json({ message: 'Alerta classificado com sucesso', severity });
});

module.exports = router;

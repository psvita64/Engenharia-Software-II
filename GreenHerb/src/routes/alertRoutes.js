const express = require('express');
const router = express.Router();
const { classifyAlert, validateAlertData } = require('../services/alertService');

router.post('/', (req, res) => {
  const validation = validateAlertData(req.body);

  if (!validation.valid) {

    return res.status(400).json({
      error: 'Dados de alerta inválidos',
      details: validation.errors
    });

  }

  const {
    temperature,
    humidity,
    limits,
    sensorOK
  } = req.body;
  
  const result =
    classifyAlert(
      temperature,
      humidity,
      limits,
      sensorOK
    );

  return res.status(200).json({ message: 'Alerta classificado com sucesso', severity: result.severity });
});

module.exports = router;

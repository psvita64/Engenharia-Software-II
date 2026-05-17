const express = require('express');
const router = express.Router();
const { validateReportRequest } = require('../services/reportService');

router.post('/', (req, res) => {
  const report = req.body;
  const validation = validateReportRequest(report);

  if (!validation.valid) {
    return res.status(400).json({ error: 'Pedido de relatório inválido', details: validation.errors });
  }

  return res.status(200).json({message: 'Relatório gerado com sucesso',
    report: {
      type: report.type,
      from: report.from,
      to: report.to,
      summary: 'Sumário de relatório simulado'
    }
  });
});

module.exports = router;

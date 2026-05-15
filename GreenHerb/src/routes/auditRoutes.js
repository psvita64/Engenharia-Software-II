const express = require('express');
const router = express.Router();
const { validateAuditEntry } = require('../services/auditService');

router.post('/', (req, res) => {
  const auditEntry = req.body;
  const validation = validateAuditEntry(auditEntry);

  if (!validation.valid) {
    return res.status(400).json({ error: 'Entrada de auditoria inválida', details: validation.errors });
  }

  res.status(201).json({ message: 'Entrada de auditoria registada com sucesso', auditEntry });
});

module.exports = router;

const validateAuditEntry = (audit) => {
  const errors = [];

  if (!audit.userId) errors.push('userId é obrigatório');
  if (!audit.event || audit.event.trim() === '') errors.push('Evento é obrigatório');
  if (!audit.timestamp || isNaN(Date.parse(audit.timestamp))) errors.push('Timestamp inválido');

  return { valid: errors.length === 0, errors };
};

module.exports = { validateAuditEntry };

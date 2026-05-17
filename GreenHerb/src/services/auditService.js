const validateAuditEntry = (audit) => {
  const errors = [];

  if (!audit.userId || typeof audit.userId !== 'string' || audit.userId.trim() === '') errors.push('userId é obrigatório');
  if (!audit.event || typeof audit.event !== 'string' || audit.event.trim() === '') errors.push('Evento é obrigatório');
  if (!audit.timestamp || isNaN(Date.parse(audit.timestamp))) errors.push('Timestamp inválido');

  return { valid: errors.length === 0, errors };
};

module.exports = { validateAuditEntry };

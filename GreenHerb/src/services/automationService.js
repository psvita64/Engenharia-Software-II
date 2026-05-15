const validateAutomationRule = (rule) => {
  const errors = [];

  if (!rule.trigger || !rule.trigger.type) errors.push('Trigger é obrigatório');
  if (!rule.action || !rule.action.type) errors.push('Action é obrigatório');
  if (rule.enabled === undefined || typeof rule.enabled !== 'boolean') errors.push('Enabled deve ser booleano');

  return { valid: errors.length === 0, errors };
};

module.exports = { validateAutomationRule };

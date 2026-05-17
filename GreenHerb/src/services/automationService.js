const validateAutomationRule = (rule) => {
  const errors = [];

  if (!rule.trigger || typeof rule.trigger !== 'object' || !rule.trigger.type) errors.push('Trigger é obrigatório');
  if (!rule.action || typeof rule.action !== 'object' || !rule.action.type) errors.push('Action é obrigatório');
  if (rule.enabled === undefined || typeof rule.enabled !== 'boolean') errors.push('Enabled deve ser booleano');

  return { valid: errors.length === 0, errors };
};

module.exports = { validateAutomationRule };

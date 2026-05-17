const validateBatch = (batch) => {
  const errors = [];

  const VALID_STATUSES = [
    'planejado',
    'em andamento',
    'concluído',
    'cancelado'
  ];

  if (!batch.name || typeof batch.name !== 'string' || batch.name.trim() === '') errors.push('Nome do lote é obrigatório');
  if (!batch.crop || typeof batch.crop !== 'string' || batch.crop.trim() === '') errors.push('Cultivo é obrigatório');
  if (!batch.startDate || isNaN(Date.parse(batch.startDate))) errors.push('Data de início inválida');
  if (batch.expectedDuration === undefined || batch.expectedDuration < 1 || batch.expectedDuration > 365) {
    errors.push('Duração esperada inválida');
  }

  const status = String(batch.status || '').toLowerCase();
  if (!VALID_STATUSES.includes(status)) errors.push('Status do lote inválido');

  return { valid: errors.length === 0, errors };
};

module.exports = { validateBatch };

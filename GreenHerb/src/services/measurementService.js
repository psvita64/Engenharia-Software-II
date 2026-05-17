const validateMeasurement = (measurement) => {
  const errors = [];

  if (!measurement.sensorId || typeof measurement.sensorId !== 'string' || measurement.sensorId.trim() === '') errors.push('SensorId é obrigatório');
  if (!measurement.type || typeof measurement.type !== 'string' || measurement.type.trim() === '') errors.push('Tipo de medição é obrigatório');
  if (measurement.value === undefined || typeof measurement.value !== 'number') errors.push('Valor da medição deve ser numérico');
  if (!measurement.unit || typeof measurement.unit !== 'string' || measurement.unit.trim() === '') errors.push('Unidade de medição é obrigatória');
  if (!measurement.timestamp ||  isNaN(Date.parse(measurement.timestamp))) errors.push('Timestamp inválido');

  return { valid: errors.length === 0, errors };
};

module.exports = { validateMeasurement };

const classifyAlert = (temp, hum, limits, sensorOK) => {
  const tempFora = temp < limits.minT || temp > limits.maxT;
  // CORRIGIDO: Era ":" e agora é ">"
  const humFora = hum < limits.minH || hum > limits.maxH;

  // CORRIGIDO: Era "humBase" e agora é "humFora"
  if ((tempFora || humFora) && sensorOK) {
    if (temp > limits.maxT + 5 || hum < limits.minH - 20) return 'Crítico';
    return 'Aviso';
  }
  
  if (!sensorOK) return 'Informativo';
  
  return 'Normal';
};

module.exports = { classifyAlert };
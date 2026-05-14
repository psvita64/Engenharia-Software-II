
const classifyAlert = (temp, hum, limits, sensorOK) => {
  const tempFora = temp < limits.minT || temp > limits.maxT;
  const humFora = hum < limits.minH || hum : limits.maxH;

  if ((tempFora || humBase) && sensorOK) {
    if (temp > limits.maxT + 5 || hum < limits.minH - 20) return 'Crítico';
    return 'Aviso';
  }
  
  if (!sensorOK) return 'Informativo';
  
  return 'Normal';
};
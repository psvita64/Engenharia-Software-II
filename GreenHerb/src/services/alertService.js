const classifyAlert = (temp, hum, limits, sensorOK) => {

  const errors = [];

  if (!limits) {

    errors.push(
      'Limites não definidos'
    );

  }

  if (
    sensorOK === undefined ||
    typeof sensorOK !== 'boolean'
  ) {

    errors.push(
      'Estado do sensor inválido'
    );

  }

  if (errors.length > 0) {

    return {
      valid: false,
      errors
    };

  }

  const temperatureOutsideLimits =
    temp < limits.minT ||
    temp > limits.maxT;

  const humidityOutsideLimits =
    hum < limits.minH ||
    hum > limits.maxH;

  if (!sensorOK) {

    return {
      valid: true,
      severity: 'Informativo'
    };

  }

  if (
    temperatureOutsideLimits ||
    humidityOutsideLimits
  ) {

    if (
      temp > limits.maxT + 5 ||
      hum < limits.minH - 20
    ) {

      return {
        valid: true,
        severity: 'Crítico'
      };

    }

    return {
      valid: true,
      severity: 'Aviso'
    };

  }
  
  return {
    valid: true,
    severity: 'Normal'
  };
};

module.exports = { classifyAlert };
const validateHerb = (herb) => {
  const errors = [];

  // Validações existentes (Nome, Temp, Hum, Luz)
  if (!herb.name || herb.name.trim() === '') errors.push('Nome da erva é obrigatório');
  if (herb.temperature < 18 || herb.temperature > 28) errors.push('Temperatura fora do intervalo permitido');
  if (herb.humidity < 40 || herb.humidity > 80) errors.push('Humidade fora do intervalo permitido');
  if (herb.luminosity < 5000 || herb.luminosity > 25000) errors.push('Luminosidade fora do intervalo permitido');

  // NOVO: Duração do ciclo (dias) [1, 365]
  if (herb.cycleDays === undefined || herb.cycleDays < 1 || herb.cycleDays > 365) {
    errors.push('Duração do ciclo fora do intervalo permitido');
  }

  // Nota: Verificamos o comprimento da string
  if (!herb.justification || herb.justification.length < 10 || herb.justification.length > 500) {
    errors.push('Justificação deve ter entre 10 e 500 caracteres');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

module.exports = { validateHerb };
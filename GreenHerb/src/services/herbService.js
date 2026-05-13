const validateHerb = (herb) => {

  const errors = [];

  // Nome obrigatório
  if (!herb.name || herb.name.trim() === ''){
    errors.push('Nome da erva é obrigatório');
  }

  // Temperatura
  if (herb.temperature < 18 || herb.temperature > 28){
    errors.push('Temperatura fora do intervalo permitido');
  }

  // Humidade
  if (herb.humidity < 40 || herb.humidity > 80){
    errors.push('Humidade fora do intervalo permitido');
  }

  // Luminosidade
  if (herb.luminosity < 5000 || herb.luminosity > 25000){
    errors.push('Luminosidade fora do intervalo permitido');
  }

  // No herbService.js, adiciona isto:
if (!herb.cycleDays || herb.cycleDays < 1 || herb.cycleDays > 365) {
  errors.push('Duração do ciclo fora do intervalo permitido');
}

  return {valid: errors.length === 0, errors};
};

module.exports = {
  validateHerb
};

const validatePlan = (plan) => {

  const errors = [];

  // Tipos válidos
  const validTypes = [
    'regular',
    'emergencia',
    'pontual'
  ];

  // Tipo inválido
  if (!validTypes.includes(plan.type)) {
    errors.push('Tipo de plano inválido');
  }

  // Adiciona isto dentro da função validatePlan
if (plan.justification) {
  if (plan.justification.length < 10 || plan.justification.length > 500) {
    errors.push('Justificação deve ter entre 10 e 500 caracteres');
  }
}

  // Temperatura
  if (plan.temperature < 18 || plan.temperature > 28){
    errors.push(
      'Temperatura fora do intervalo permitido'
    );
  }

  // Humidade
  if (plan.humidity < 40 || plan.humidity > 80){
    errors.push(
      'Humidade fora do intervalo permitido'
    );
  }

  // Luminosidade
  if (plan.luminosity < 5000 || plan.luminosity > 25000){
    errors.push(
      'Luminosidade fora do intervalo permitido'
    );
  }

  // Duração
  if (plan.duration < 1 || plan.duration > 365){
    errors.push(
      'Duração fora do intervalo permitido'
    );
  }

  // Plano pontual exige autorização
  if (plan.type === 'pontual' && !plan.authorizedByResponsible){
    errors.push(
      'Plano pontual exige autorização'
    );
  }

  return {valid: errors.length === 0, errors};
};

module.exports = {
  validatePlan
};
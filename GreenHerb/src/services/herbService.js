const fs = require('fs');

const validateHerb = (herb) => {
  const errors = [];

  if (!herb.name || herb.name.trim() === '') errors.push('Nome da erva é obrigatório');
  if (herb.temperature < 18 || herb.temperature > 28) errors.push('Temperatura fora do intervalo permitido');
  if (herb.humidity < 40 || herb.humidity > 80) errors.push('Humidade fora do intervalo permitido');
  if (herb.luminosity < 5000 || herb.luminosity > 25000) errors.push('Luminosidade fora do intervalo permitido');
  if (herb.cycleDays === undefined || herb.cycleDays < 1 || herb.cycleDays > 365) errors.push('Duração do ciclo fora do intervalo permitido');

  return {
    valid: errors.length === 0,
    errors
  };
};

const processHerbImport = (filePath) => {

  const content = fs.readFileSync(filePath, 'utf-8');

  const lines = content.split('\n').filter(line => line.trim() !== '');

  return lines.map(line => {

    const [
      name,
      temp,
      hum,
      lux,
      cycle
    ] = line.split(',');

    return validateHerb({

      name: name?.trim(),

      temperature:
        parseFloat(temp),

      humidity:
        parseFloat(hum),

      luminosity:
        parseFloat(lux),

      cycleDays:
        parseInt(cycle)

    });

  });

};

module.exports = { validateHerb, processHerbImport };
const fs = require('fs');
const { validateHerb } = require('./herbService');

const importHerbsFromCSV = (filePath) => {
  // 1. Lemos o ficheiro como uma string única
  const content = fs.readFileSync(filePath, 'utf-8');

  // 2. Dividimos o texto por quebras de linha (\n)
  const lines = content.split('\n');

  const results = {
    success: [],
    errors: []
  };

  lines.forEach((line, index) => {
    if (line.trim() === '') return; // Ignora linhas vazias

    // 3. Dividimos cada linha pelas vírgulas
    const [name, temp, hum, lux, cycle] = line.split(',');

    const herb = {
      name: name?.trim(),
      temperature: parseFloat(temp),
      humidity: parseFloat(hum),
      luminosity: parseFloat(lux),
      cycleDays: parseInt(cycle)
    };

    // 4. Validamos usando o teu validador que já existe
    const validation = validateHerb(herb);

    if (validation.valid) {
      results.success.push(herb);
    } else {
      results.errors.push({ line: index + 1, errors: validation.errors });
    }
  });

  return results;
};

module.exports = { importHerbsFromCSV };
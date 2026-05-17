const fs = require('fs');
const { validateHerb } = require('./herbService');

const importHerbsFromCSV = (filePath) => {
  
  const content = fs.readFileSync(filePath, 'utf-8');

  
  const lines = content.split('\n');

  const results = {
    success: [],
    errors: []
  };

  lines.forEach((line, index) => {
    if (line.trim() === '') return; 

    const [name, temp, hum, lux, cycle] = line.split(',');

    const herb = {
      name: name?.trim(),
      temperature: parseFloat(temp),
      humidity: parseFloat(hum),
      luminosity: parseFloat(lux),
      cycleDays: parseInt(cycle)
    };

    
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
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { validateHerb } = require('../services/herbService');
const fs = require('fs');

// AGORA o router já está definido e podes usar:
router.post('/import', upload.single('file'), (req, res) => {
   try {
     if (!req.file) return res.status(400).json({ error: 'Nenhum ficheiro enviado' });

     const content = fs.readFileSync(req.file.path, 'utf-8');
     const lines = content.split('\n').filter(l => l.trim() !== '');
    
     const results = lines.map(line => {
       const [name, temp, hum, lux, cycle, justification] = line.split(',');
       return validateHerb({
         name: name?.trim(),
         temperature: parseFloat(temp),
         humidity: parseFloat(hum),
         luminosity: parseFloat(lux),
         cycleDays: parseInt(cycle),
         justification: justification?.trim()
       });
     });

     res.status(201).json({ message: 'Processamento concluído', details: results });
   } catch (error) {
     res.status(500).json({ error: 'Erro interno no processamento', details: error.message });
   }
});

// NÃO ESQUECER: Exportar o router no final do ficheiro
module.exports = router;
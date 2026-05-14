const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { parseAndValidateHerbLine } = require('../services/herbImportService');
const fs = require('fs');

router.post('/import', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum ficheiro enviado' });

  const filePath = req.file.path;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');
  
  const results = lines.map(line => parseAndValidateHerbLine(line));
  
  // Limpa o ficheiro temporário
  fs.unlinkSync(filePath);

  res.status(201).json({
    message: 'Processamento concluído',
    details: results
  });
});

module.exports = router;
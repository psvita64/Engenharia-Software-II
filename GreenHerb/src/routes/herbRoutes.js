const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const { processHerbImport } = require('../services/herbService');
const { authorize } = require('../middleware/authMiddleware');

router.post('/import', authorize(['Administrador']), upload.single('file'), (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum ficheiro enviado' });
    }

    const result = processHerbImport(req.file.path);

    return res.status(201).json({ message: 'Processamento concluído', details: result });
  } catch (error) {
      return res.status(500).json({ error: 'Erro interno no processamento', details: error.message });
  }
});

module.exports = router;
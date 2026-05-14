
const express = require('express');
const router = express.Router();
const { validatePlan } = require('../services/planService');

router.post('/', (req, res) => {
  const planData = req.body;
  const validation = validatePlan(planData);

  if (!validation.valid) {
    return res.status(400).json({ 
      error: 'Dados do plano inválidos', 
      details: validation.errors 
    });
  }

  // Aqui simularias o salvamento na base de dados
  res.status(201).json({ 
    message: 'Plano de cultivo criado com sucesso!',
    plan: planData 
  });
});

module.exports = router;
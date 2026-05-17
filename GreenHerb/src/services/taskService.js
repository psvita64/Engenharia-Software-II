const validateTask = (task) => {
  const errors = [];

  const VALID_STATUSES = [
    'pendente',
    'em andamento',
    'concluída',
    'atrasada'
  ];

  if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') errors.push('Título da tarefa é obrigatório');
  if (!task.batchId ) errors.push('batchId é obrigatório');
  if (!task.assignedTo || typeof task.assignedTo !== 'string' || task.assignedTo.trim() === '') errors.push('Responsável é obrigatório');
  if (!task.dueDate || isNaN(Date.parse(task.dueDate))) errors.push('Data de conclusão inválida');

  const status = String(task.status || '').toLowerCase();
  if (!VALID_STATUSES.includes(status)) errors.push('Status da tarefa inválido');

  return { valid: errors.length === 0, errors };
};

module.exports = { validateTask };

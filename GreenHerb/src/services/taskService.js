const validateTask = (task) => {
  const errors = [];

  if (!task.title || task.title.trim() === '') errors.push('Título da tarefa é obrigatório');
  if (!task.batchId) errors.push('batchId é obrigatório');
  if (!task.assignedTo || task.assignedTo.trim() === '') errors.push('Responsável é obrigatório');
  if (!task.dueDate || isNaN(Date.parse(task.dueDate))) errors.push('Data de conclusão inválida');

  const status = String(task.status || '').toLowerCase();
  const validStatuses = ['pendente', 'em andamento', 'concluída', 'atrasada'];
  if (!validStatuses.includes(status)) errors.push('Status da tarefa inválido');

  return { valid: errors.length === 0, errors };
};

module.exports = { validateTask };

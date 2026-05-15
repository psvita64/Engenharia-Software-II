const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de endpoint /tasks', () => {
  test('Deve criar uma tarefa válida', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Rega Diária',
        batchId: 'batch-123',
        assignedTo: 'Técnico 1',
        dueDate: '2026-05-10',
        status: 'pendente'
      });

    expect(response.status).toBe(201);
    expect(response.body.task.title).toBe('Rega Diária');
  });

  test('Deve rejeitar tarefa sem título', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        batchId: 'batch-123',
        assignedTo: 'Técnico 1',
        dueDate: '2026-05-10',
        status: 'pendente'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Título da tarefa é obrigatório');
  });

  test('Deve rejeitar tarefa sem batchId', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Rega Diária',
        assignedTo: 'Técnico 1',
        dueDate: '2026-05-10',
        status: 'pendente'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('batchId é obrigatório');
  });

  test('Deve rejeitar tarefa com data inválida', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Rega Diária',
        batchId: 'batch-123',
        assignedTo: 'Técnico 1',
        dueDate: 'invalid-date',
        status: 'pendente'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Data de conclusão inválida');
  });

  test('Deve rejeitar tarefa com status inválido', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Rega Diária',
        batchId: 'batch-123',
        assignedTo: 'Técnico 1',
        dueDate: '2026-05-10',
        status: 'invalido'
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Status da tarefa inválido');
  });
});

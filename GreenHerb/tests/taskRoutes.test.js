const request = require('supertest');
const app = require('../src/app'); // Importa a tua app Express global
const { validateTask } = require('../src/services/taskService');

/* ==========================================================================
   1. TESTES DE UNIDADE (Nível 1) - Validação Lógica Isolada
   ========================================================================= */
describe('GREENHERB - Testes de Unidade: Validação de Tarefas', () => {

  // --- 1.1. PARTICIONAMENTO DE EQUIVALÊNCIA (Campos Obrigatórios e Tipos) ---
  test('Deve validar com sucesso uma tarefa com estrutura totalmente correta', () => {
    const tarefaValida = {
      title: 'Rega de Nutrientes Lote A',
      batchId: 101,
      assignedTo: 'Técnico Agrícola João',
      dueDate: '2026-06-01T18:00:00.000Z',
      status: 'pendente'
    };

    const resultado = validateTask(tarefaValida);
    expect(resultado.valid).toBe(true);
    expect(resultado.errors.length).toBe(0);
  });

  test('Deve rejeitar se o título ou o responsável estiverem vazios ou em branco', () => {
    const tarefaInvalida = {
      title: '   ', // Apenas espaços
      batchId: 101,
      assignedTo: '', // Vazio
      dueDate: '2026-06-01T18:00:00.000Z',
      status: 'pendente'
    };

    const resultado = validateTask(tarefaInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Título da tarefa é obrigatório');
    expect(resultado.errors).toContain('Responsável é obrigatório');
  });

  test('Deve rejeitar se o batchId estiver em falta', () => {
    const tarefaInvalida = {
      title: 'Poda preventiva',
      assignedTo: 'Técnico Silva',
      dueDate: '2026-06-01T18:00:00.000Z',
      status: 'em andamento'
      // batchId em falta
    };

    const resultado = validateTask(tarefaInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('batchId é obrigatório');
  });

  test('Deve rejeitar se o formato da data limite (dueDate) for corrompido', () => {
    const tarefaInvalida = {
      title: 'Verificação de pH',
      batchId: 101,
      assignedTo: 'Engenheira Rita',
      dueDate: 'formato-data-invalido',
      status: 'pendente'
    };

    const resultado = validateTask(tarefaInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Data de conclusão inválida');
  });

  // --- 1.2. PARTICIONAMENTO DE EQUIVALÊNCIA (Máquina de Estados / Status Permitidos) ---
  describe('Validação das Classes de Estados (Status Permissíveis)', () => {

    test('Deve aceitar strings válidas independentemente de maiúsculas/minúsculas', () => {
      const resultado = validateTask({
        title: 'Tarefa A', batchId: 1, assignedTo: 'User', dueDate: '2026-05-20',
        status: 'CONCLUÍDA' // Teste de normalização toLowerCase()
      });
      expect(resultado.valid).toBe(true);
    });

    test('Deve rejeitar se o status não pertencer ao ciclo de vida de tarefas', () => {
      const resultado = validateTask({
        title: 'Tarefa B', batchId: 1, assignedTo: 'User', dueDate: '2026-05-20',
        status: 'arquivada_por_engano' // Fora da lista validStatuses
      });
      expect(resultado.valid).toBe(false);
      expect(resultado.errors).toContain('Status da tarefa inválido');
    });
  });
});

/* ==========================================================================
   2. TESTES DE INTEGRAÇÃO (Nível 2) - Contratos da Rota HTTP
   ========================================================================= */
describe('GREENHERB - Testes de Integração: Rota POST /tasks', () => {

  test('POST /tasks -> Deve responder 201 Created quando o payload estrutural for válido', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Colheita Lote Hortelã',
        batchId: 45,
        assignedTo: 'Operador Técnico Carlos',
        dueDate: new Date().toISOString(),
        status: 'pendente'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Tarefa criada com sucesso!');
    expect(response.body).toHaveProperty('task');
  });

  test('POST /tasks -> Deve responder 400 Bad Request se falhar nos parâmetros estruturais', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: '',
        batchId: null,
        assignedTo: 'Operador',
        dueDate: 'data-errada',
        status: 'status_fantasma'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Dados de tarefa inválidos');
    expect(response.body.details.length).toBeGreaterThan(0);
  });
});

/* ==========================================================================
   3. TESTES DE SISTEMA (Nível 3) - Fluxo End-to-End (E2E)
   ========================================================================= */
describe('GREENHERB - Testes de Sistema: Fluxo de Atribuição Operacional', () => {

  test('Fluxo E2E: Agendamento de uma tarefa de rotina seguida do início da atividade em campo', async () => {
    
    // Passo 1: O Gestor cria a tarefa no sistema planeando o trabalho técnico (Status: pendente)
    const agendamento = await request(app)
      .post('/tasks')
      .send({
        title: 'Calibração do sensor EC Lote 2',
        batchId: 12,
        assignedTo: 'Técnico Fonseca',
        dueDate: '2026-05-25T10:00:00.000Z',
        status: 'pendente'
      });

    expect(agendamento.status).toBe(201);
    expect(agendamento.body.task.status.toLowerCase()).toBe('pendente');

    // Passo 2: O Técnico chega à estufa, aceita o encargo e inicia a atividade física
    // O sistema regista o pipeline com a transição de estado na app
    const inícioTrabalho = await request(app)
      .post('/tasks')
      .send({
        title: 'Calibração do sensor EC Lote 2',
        batchId: 12,
        assignedTo: 'Técnico Fonseca',
        dueDate: '2026-05-25T10:00:00.000Z',
        status: 'em andamento' // Transição de estado E2E
      });

    expect(inícioTrabalho.status).toBe(201);
    expect(inícioTrabalho.body.task.status.toLowerCase()).toBe('em andamento');
  });
});

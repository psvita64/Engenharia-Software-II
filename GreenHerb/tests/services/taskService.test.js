const { validateTask } = require('../../src/services/taskService');

describe('GREENHERB - Unit Tests - Task Service', () => {

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // TÍTULO DA TAREFA
  // =====================================================

  describe('Validação do Título da Tarefa', () => {

    test('Deve aceitar título válido', () => {

      const task = {
        title: 'Rega do lote A',
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar título vazio', () => {

      const task = {
        title: '',
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Título da tarefa é obrigatório'
      );

    });

    test('Deve rejeitar título undefined', () => {

      const task = {
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Título da tarefa é obrigatório'
      );

    });

    test('Deve rejeitar título apenas com espaços', () => {

      const task = {
        title: '   ',
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Título da tarefa é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // BATCH ID
  // =====================================================

  describe('Validação do Batch ID', () => {

    test('Deve aceitar batchId válido', () => {

      const task = {
        title: 'Rega do lote A',
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar batchId undefined', () => {

      const task = {
        title: 'Rega do lote A',
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'batchId é obrigatório'
      );

    });

    test('Deve rejeitar batchId nulo', () => {

      const task = {
        title: 'Rega do lote A',
        batchId: null,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'batchId é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // RESPONSÁVEL
  // =====================================================

  describe('Validação do Responsável', () => {

    test('Deve aceitar responsável válido', () => {

      const task = {
        title: 'Fertilização',
        batchId: 1,
        assignedTo: 'Maria',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar responsável vazio', () => {

      const task = {
        title: 'Fertilização',
        batchId: 1,
        assignedTo: '',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Responsável é obrigatório'
      );

    });

    test('Deve rejeitar responsável undefined', () => {

      const task = {
        title: 'Fertilização',
        batchId: 1,
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Responsável é obrigatório'
      );

    });

    test('Deve rejeitar responsável apenas com espaços', () => {

      const task = {
        title: 'Fertilização',
        batchId: 1,
        assignedTo: '   ',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Responsável é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // DATA DE CONCLUSÃO
  // =====================================================

  describe('Validação da Data de Conclusão', () => {

    test('Deve aceitar data válida', () => {

      const task = {
        title: 'Colheita',
        batchId: 1,
        assignedTo: 'Carlos',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar data inválida', () => {

      const task = {
        title: 'Colheita',
        batchId: 1,
        assignedTo: 'Carlos',
        dueDate: 'data-invalida',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data de conclusão inválida'
      );

    });

    test('Deve rejeitar data undefined', () => {

      const task = {
        title: 'Colheita',
        batchId: 1,
        assignedTo: 'Carlos',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data de conclusão inválida'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // STATUS DA TAREFA
  // =====================================================

  describe('Validação do Status da Tarefa', () => {

    test('Deve aceitar status pendente', () => {

      const task = {
        title: 'Monitorização',
        batchId: 1,
        assignedTo: 'Ana',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar status em andamento', () => {

      const task = {
        title: 'Monitorização',
        batchId: 1,
        assignedTo: 'Ana',
        dueDate: '2026-05-01',
        status: 'em andamento'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar status concluída', () => {

      const task = {
        title: 'Monitorização',
        batchId: 1,
        assignedTo: 'Ana',
        dueDate: '2026-05-01',
        status: 'concluída'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar status atrasada', () => {

      const task = {
        title: 'Monitorização',
        batchId: 1,
        assignedTo: 'Ana',
        dueDate: '2026-05-01',
        status: 'atrasada'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar status inválido', () => {

      const task = {
        title: 'Monitorização',
        batchId: 1,
        assignedTo: 'Ana',
        dueDate: '2026-05-01',
        status: 'cancelada'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Status da tarefa inválido'
      );

    });

  });

  // =====================================================
  // MC/DC E CONDIÇÕES MÚLTIPLAS
  // =====================================================

  describe('MC/DC - Título da Tarefa', () => {

    test('Deve rejeitar título undefined', () => {

      const task = {
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Título da tarefa é obrigatório'
      );

    });

    test('Deve rejeitar título vazio', () => {

      const task = {
        title: '',
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Título da tarefa é obrigatório'
      );

    });

    test('Deve rejeitar título apenas com espaços', () => {

      const task = {
        title: '   ',
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Título da tarefa é obrigatório'
      );

    });

    test('Deve aceitar título válido', () => {

      const task = {
        title: 'Aplicar fertilizante',
        batchId: 1,
        assignedTo: 'João',
        dueDate: '2026-05-01',
        status: 'pendente'
      };

      const result = validateTask(task);

      expect(result.valid).toBe(true);

    });

  });

});
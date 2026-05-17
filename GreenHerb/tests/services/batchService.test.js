const { validateBatch } = require('../../src/services/batchService');

describe('GREENHERB - Unit Tests - Batch Service', () => {

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // NOME DO LOTE
  // =====================================================

  describe('Validação do Nome do Lote', () => {

    test('Deve aceitar nome válido', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Hortelã',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar nome vazio', () => {

      const batch = {
        name: '',
        crop: 'Hortelã',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Nome do lote é obrigatório'
      );

    });

    test('Deve rejeitar nome undefined', () => {

      const batch = {
        crop: 'Hortelã',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Nome do lote é obrigatório'
      );

    });

    test('Deve rejeitar nome apenas com espaços', () => {

      const batch = {
        name: '   ',
        crop: 'Hortelã',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Nome do lote é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // CULTIVO
  // =====================================================

  describe('Validação do Cultivo', () => {

    test('Deve aceitar cultivo válido', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Alecrim',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar cultivo vazio', () => {

      const batch = {
        name: 'Lote A',
        crop: '',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Cultivo é obrigatório'
      );

    });

    test('Deve rejeitar cultivo undefined', () => {

      const batch = {
        name: 'Lote A',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Cultivo é obrigatório'
      );

    });

    test('Deve rejeitar cultivo apenas com espaços', () => {

      const batch = {
        name: 'Lote A',
        crop: '   ',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Cultivo é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // STATUS DO LOTE
  // =====================================================

  describe('Validação do Status do Lote', () => {

    test('Deve aceitar status planejado', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Manjericão',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar status em andamento', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Manjericão',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'em andamento'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar status concluído', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Manjericão',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'concluído'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar status cancelado', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Manjericão',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'cancelado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar status inválido', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Manjericão',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'ativo'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Status do lote inválido'
      );

    });

  });

  // =====================================================
  // ANÁLISE DE VALORES LIMITE
  // DURAÇÃO [1, 365]
  // =====================================================

  describe('Valores Limite - Duração Esperada', () => {

    test('Deve rejeitar duração abaixo do limite mínimo (0)', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Salsa',
        startDate: '2026-05-01',
        expectedDuration: 0,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Duração esperada inválida'
      );

    });

    test('Deve aceitar duração no limite mínimo (1)', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Salsa',
        startDate: '2026-05-01',
        expectedDuration: 1,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar duração nominal (90)', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Salsa',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar duração no limite máximo (365)', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Salsa',
        startDate: '2026-05-01',
        expectedDuration: 365,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar duração acima do limite máximo (366)', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Salsa',
        startDate: '2026-05-01',
        expectedDuration: 366,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Duração esperada inválida'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // DATA DE INÍCIO
  // =====================================================

  describe('Validação da Data de Início', () => {

    test('Deve aceitar data válida', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Tomilho',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar data inválida', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Tomilho',
        startDate: 'data-invalida',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data de início inválida'
      );

    });

    test('Deve rejeitar data undefined', () => {

      const batch = {
        name: 'Lote A',
        crop: 'Tomilho',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data de início inválida'
      );

    });

  });

  // =====================================================
  // MC/DC E CONDIÇÕES MÚLTIPLAS
  // =====================================================

  describe('MC/DC - Nome do Lote', () => {

    test('Deve rejeitar nome undefined', () => {

      const batch = {
        crop: 'Alecrim',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Nome do lote é obrigatório'
      );

    });

    test('Deve rejeitar nome vazio', () => {

      const batch = {
        name: '',
        crop: 'Alecrim',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Nome do lote é obrigatório'
      );

    });

    test('Deve rejeitar nome apenas com espaços', () => {

      const batch = {
        name: '   ',
        crop: 'Alecrim',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Nome do lote é obrigatório'
      );

    });

    test('Deve aceitar nome válido', () => {

      const batch = {
        name: 'Lote Primavera',
        crop: 'Alecrim',
        startDate: '2026-05-01',
        expectedDuration: 90,
        status: 'planejado'
      };

      const result = validateBatch(batch);

      expect(result.valid).toBe(true);

    });

  });

});
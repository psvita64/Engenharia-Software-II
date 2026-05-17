const { validateReportRequest } = require('../../src/services/reportService');

describe('GREENHERB - Unit Tests - Report Service', () => {

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // TIPO DE RELATÓRIO
  // =====================================================

  describe('Validação do Tipo de Relatório', () => {

    test('Deve aceitar relatório daily', () => {

      const report = {
        type: 'daily',
        from: '2026-05-01',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar relatório weekly', () => {

      const report = {
        type: 'weekly',
        from: '2026-05-01',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar relatório monthly', () => {

      const report = {
        type: 'monthly',
        from: '2026-05-01',
        to: '2026-05-31'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar relatório custom', () => {

      const report = {
        type: 'custom',
        from: '2026-05-01',
        to: '2026-05-15'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar tipo de relatório inválido', () => {

      const report = {
        type: 'annual',
        from: '2026-05-01',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de relatório inválido'
      );

    });

    test('Deve rejeitar tipo undefined', () => {

      const report = {
        from: '2026-05-01',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de relatório inválido'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // DATA INICIAL
  // =====================================================

  describe('Validação da Data Inicial', () => {

    test('Deve aceitar data inicial válida', () => {

      const report = {
        type: 'daily',
        from: '2026-05-01',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar data inicial inválida', () => {

      const report = {
        type: 'daily',
        from: 'data-invalida',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data inicial inválida'
      );

    });

    test('Deve rejeitar data inicial undefined', () => {

      const report = {
        type: 'daily',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data inicial inválida'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // DATA FINAL
  // =====================================================

  describe('Validação da Data Final', () => {

    test('Deve aceitar data final válida', () => {

      const report = {
        type: 'daily',
        from: '2026-05-01',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar data final inválida', () => {

      const report = {
        type: 'daily',
        from: '2026-05-01',
        to: 'data-invalida'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data final inválida'
      );

    });

    test('Deve rejeitar data final undefined', () => {

      const report = {
        type: 'daily',
        from: '2026-05-01'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data final inválida'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE / INTERVALO DE DATAS
  // =====================================================

  describe('Validação do Intervalo de Datas', () => {

    test('Deve aceitar intervalo válido', () => {

      const report = {
        type: 'custom',
        from: '2026-05-01',
        to: '2026-05-15'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar datas iguais', () => {

      const report = {
        type: 'daily',
        from: '2026-05-01',
        to: '2026-05-01'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar intervalo onde data inicial é maior que data final', () => {

      const report = {
        type: 'custom',
        from: '2026-06-01',
        to: '2026-05-01'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Intervalo de datas inválido'
      );

    });

  });

  // =====================================================
  // MC/DC E CONDIÇÕES MÚLTIPLAS
  // =====================================================

  describe('MC/DC - Intervalo de Datas', () => {

    test('Deve validar quando ambas as datas são válidas e from < to', () => {

      const report = {
        type: 'daily',
        from: '2026-05-01',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar quando data inicial é inválida', () => {

      const report = {
        type: 'daily',
        from: 'data-invalida',
        to: '2026-05-07'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data inicial inválida'
      );

    });

    test('Deve rejeitar quando data final é inválida', () => {

      const report = {
        type: 'daily',
        from: '2026-05-01',
        to: 'data-invalida'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Data final inválida'
      );

    });

    test('Deve rejeitar quando fromDate > toDate', () => {

      const report = {
        type: 'daily',
        from: '2026-06-01',
        to: '2026-05-01'
      };

      const result = validateReportRequest(
        report
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Intervalo de datas inválido'
      );

    });

  });

});
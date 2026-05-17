const { validateAuditEntry } = require('../../src/services/auditService');

describe('GREENHERB - Unit Tests - Audit Service', () => {

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // USER ID
  // =====================================================

  describe('Validação do User ID', () => {

    test('Deve aceitar userId válido', () => {

      const audit = {
        userId: 'admin-01',
        event: 'Login efetuado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar userId vazio', () => {

      const audit = {
        userId: '',
        event: 'Login efetuado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'userId é obrigatório'
      );

    });

    test('Deve rejeitar userId undefined', () => {

      const audit = {
        event: 'Login efetuado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'userId é obrigatório'
      );

    });

    test('Deve rejeitar userId apenas com espaços', () => {

      const audit = {
        userId: '   ',
        event: 'Login efetuado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'userId é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // EVENTO
  // =====================================================

  describe('Validação do Evento', () => {

    test('Deve aceitar evento válido', () => {

      const audit = {
        userId: 'admin-01',
        event: 'Plano criado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar evento vazio', () => {

      const audit = {
        userId: 'admin-01',
        event: '',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Evento é obrigatório'
      );

    });

    test('Deve rejeitar evento undefined', () => {

      const audit = {
        userId: 'admin-01',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Evento é obrigatório'
      );

    });

    test('Deve rejeitar evento apenas com espaços', () => {

      const audit = {
        userId: 'admin-01',
        event: '   ',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Evento é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // TIMESTAMP
  // =====================================================

  describe('Validação do Timestamp', () => {

    test('Deve aceitar timestamp válido', () => {

      const audit = {
        userId: 'admin-01',
        event: 'Login efetuado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar timestamp inválido', () => {

      const audit = {
        userId: 'admin-01',
        event: 'Login efetuado',
        timestamp: 'timestamp-invalido'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Timestamp inválido'
      );

    });

    test('Deve rejeitar timestamp undefined', () => {

      const audit = {
        userId: 'admin-01',
        event: 'Login efetuado'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Timestamp inválido'
      );

    });

  });

  // =====================================================
  // MC/DC E CONDIÇÕES MÚLTIPLAS
  // =====================================================

  describe('MC/DC - User ID', () => {

    test('Deve rejeitar userId undefined', () => {

      const audit = {
        event: 'Login efetuado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'userId é obrigatório'
      );

    });

    test('Deve rejeitar userId vazio', () => {

      const audit = {
        userId: '',
        event: 'Login efetuado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'userId é obrigatório'
      );

    });

    test('Deve rejeitar userId apenas com espaços', () => {

      const audit = {
        userId: '   ',
        event: 'Login efetuado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'userId é obrigatório'
      );

    });

    test('Deve aceitar userId válido', () => {

      const audit = {
        userId: 'tech-01',
        event: 'Plano atualizado',
        timestamp: '2026-05-01T10:00:00'
      };

      const result = validateAuditEntry(
        audit
      );

      expect(result.valid).toBe(true);

    });

  });

});
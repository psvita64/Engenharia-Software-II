const { validateAutomationRule } = require('../../src/services/automationService');

describe('GREENHERB - Unit Tests - Automation Service', () => {

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // TRIGGER
  // =====================================================

  describe('Validação do Trigger', () => {

    test('Deve aceitar trigger válido', () => {

      const rule = {
        trigger: {
          type: 'temperature'
        },
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar trigger undefined', () => {

      const rule = {
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Trigger é obrigatório'
      );

    });

    test('Deve rejeitar trigger vazio', () => {

      const rule = {
        trigger: {},
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Trigger é obrigatório'
      );

    });

    test('Deve rejeitar trigger que não é objeto', () => {

      const rule = {
        trigger: 'temperature',
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Trigger é obrigatório'
      );

    });

    test('Deve rejeitar trigger sem type', () => {

      const rule = {
        trigger: {
          value: 30
        },
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Trigger é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // ACTION
  // =====================================================

  describe('Validação da Action', () => {

    test('Deve aceitar action válida', () => {

      const rule = {
        trigger: {
          type: 'humidity'
        },
        action: {
          type: 'activate_irrigation'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar action undefined', () => {

      const rule = {
        trigger: {
          type: 'humidity'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Action é obrigatório'
      );

    });

    test('Deve rejeitar action vazia', () => {

      const rule = {
        trigger: {
          type: 'humidity'
        },
        action: {},
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Action é obrigatório'
      );

    });

    test('Deve rejeitar action que não é objeto', () => {

      const rule = {
        trigger: {
          type: 'humidity'
        },
        action: 'activate_irrigation',
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Action é obrigatório'
      );

    });

    test('Deve rejeitar action sem type', () => {

      const rule = {
        trigger: {
          type: 'humidity'
        },
        action: {
          value: 'activate'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Action é obrigatório'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // ENABLED
  // =====================================================

  describe('Validação do Enabled', () => {

    test('Deve aceitar enabled true', () => {

      const rule = {
        trigger: {
          type: 'temperature'
        },
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar enabled false', () => {

      const rule = {
        trigger: {
          type: 'temperature'
        },
        action: {
          type: 'activate_fan'
        },
        enabled: false
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar enabled undefined', () => {

      const rule = {
        trigger: {
          type: 'temperature'
        },
        action: {
          type: 'activate_fan'
        }
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Enabled deve ser booleano'
      );

    });

    test('Deve rejeitar enabled string', () => {

      const rule = {
        trigger: {
          type: 'temperature'
        },
        action: {
          type: 'activate_fan'
        },
        enabled: 'true'
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Enabled deve ser booleano'
      );

    });

  });

  // =====================================================
  // MC/DC E CONDIÇÕES MÚLTIPLAS
  // =====================================================

  describe('MC/DC - Trigger', () => {

    test('Deve rejeitar trigger undefined', () => {

      const rule = {
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Trigger é obrigatório'
      );

    });

    test('Deve rejeitar trigger vazio', () => {

      const rule = {
        trigger: {},
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Trigger é obrigatório'
      );

    });

    test('Deve rejeitar trigger que não é objeto', () => {

      const rule = {
        trigger: 'temperature',
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Trigger é obrigatório'
      );

    });

    test('Deve aceitar trigger válido', () => {

      const rule = {
        trigger: {
          type: 'temperature'
        },
        action: {
          type: 'activate_fan'
        },
        enabled: true
      };

      const result = validateAutomationRule(
        rule
      );

      expect(result.valid).toBe(true);

    });

  });

});
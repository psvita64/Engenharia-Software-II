const { classifyAlert } = require('../src/services/alertService');

describe('GREENHERB - Unidade - Classificação de Alertas (MCC)', () => {
  const limits = { minT: 18, maxT: 28, minH: 40, maxH: 80 };

  test('Deve retornar Normal quando tudo está ok (Caso 2 da Tabela)', () => {
    const result = classifyAlert(23, 60, limits, true);
    expect(result).toBe('Normal');
  });

  test('Deve retornar Informativo se o sensor falhar (Caso 1, 3, 5, 7)', () => {
    const result = classifyAlert(23, 60, limits, false);
    expect(result).toBe('Informativo');
  });

  test('Deve retornar Aviso se a temperatura estiver fora e sensor OK (Caso 6)', () => {
    const result = classifyAlert(30, 60, limits, true);
    expect(result).toBe('Aviso');
  });

  test('Deve retornar Crítico se a temperatura exceder muito o limite (Caso 6 - Variante)', () => {
    const result = classifyAlert(35, 60, limits, true); // > maxT + 5
    expect(result).toBe('Crítico');
  });
});
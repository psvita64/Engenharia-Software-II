const fs = require('fs');
const path = require('path');

const { importHerbsFromCSV } = require('../../src/services/herbImportService');

describe('GREENHERB - Unit Tests - CSV Import Service', () => {

  const validCSVPath = path.join(
    __dirname,
    'fixtures',
    'valid-herbs.csv'
  );

  const invalidCSVPath = path.join(
    __dirname,
    'fixtures',
    'invalid-herbs.csv'
  );

  const mixedCSVPath = path.join(
    __dirname,
    'fixtures',
    'mixed-herbs.csv'
  );

  const emptyCSVPath = path.join(
    __dirname,
    'fixtures',
    'empty-herbs.csv'
  );

  beforeAll(() => {

    const fixturesDir = path.join(
      __dirname,
      'fixtures'
    );

    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir);
    }

    // =====================================
    // CSV VÁLIDO
    // =====================================

    fs.writeFileSync(
      validCSVPath,

`Hortelã,23,60,15000,90
Alecrim,25,55,18000,120`
    );

    // =====================================
    // CSV INVÁLIDO
    // =====================================

    fs.writeFileSync(
      invalidCSVPath,

`Hortelã,50,60,15000,90
Alecrim,25,120,18000,500`
    );

    // =====================================
    // CSV MISTO
    // =====================================

    fs.writeFileSync(
      mixedCSVPath,

`Hortelã,23,60,15000,90
Alecrim,50,120,18000,500`
    );

    // =====================================
    // CSV VAZIO
    // =====================================

    fs.writeFileSync(
      emptyCSVPath,
      ''
    );

  });

  afterAll(() => {

    fs.unlinkSync(validCSVPath);
    fs.unlinkSync(invalidCSVPath);
    fs.unlinkSync(mixedCSVPath);
    fs.unlinkSync(emptyCSVPath);

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // CSV VÁLIDO
  // =====================================================

  describe('Importação de CSV Válido', () => {

    test('Deve importar todas as ervas válidas', () => {

      const result = importHerbsFromCSV(
        validCSVPath
      );

      expect(result.success.length).toBe(2);

      expect(result.errors.length).toBe(0);

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // CSV INVÁLIDO
  // =====================================================

  describe('Importação de CSV Inválido', () => {

    test('Deve rejeitar ervas inválidas', () => {

      const result = importHerbsFromCSV(
        invalidCSVPath
      );

      expect(result.success.length).toBe(0);

      expect(result.errors.length).toBe(2);

    });

    test('Deve identificar linha inválida', () => {

      const result = importHerbsFromCSV(
        invalidCSVPath
      );

      expect(result.errors[0].line).toBe(1);

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // CSV MISTO
  // =====================================================

  describe('Importação de CSV Misto', () => {

    test('Deve importar apenas linhas válidas', () => {

      const result = importHerbsFromCSV(
        mixedCSVPath
      );

      expect(result.success.length).toBe(1);

      expect(result.errors.length).toBe(1);

    });

    test('Deve guardar corretamente a erva válida', () => {

      const result = importHerbsFromCSV(
        mixedCSVPath
      );

      expect(result.success[0].name).toBe(
        'Hortelã'
      );

    });

  });

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // CSV VAZIO
  // =====================================================

  describe('Importação de CSV Vazio', () => {

    test('Deve retornar arrays vazios', () => {

      const result = importHerbsFromCSV(
        emptyCSVPath
      );

      expect(result.success.length).toBe(0);

      expect(result.errors.length).toBe(0);

    });

  });

  // =====================================================
  // VALORES LIMITE
  // =====================================================

  describe('Valores Limite', () => {

    test('Deve aceitar valores mínimos válidos', () => {

      const limitCSVPath = path.join(
        __dirname,
        'fixtures',
        'limit-valid.csv'
      );

      fs.writeFileSync(
        limitCSVPath,

`Salsa,18,40,5000,1`
      );

      const result = importHerbsFromCSV(
        limitCSVPath
      );

      expect(result.success.length).toBe(1);

      fs.unlinkSync(limitCSVPath);

    });

    test('Deve rejeitar valores abaixo dos limites', () => {

      const limitCSVPath = path.join(
        __dirname,
        'fixtures',
        'limit-invalid.csv'
      );

      fs.writeFileSync(
        limitCSVPath,

`Salsa,17,39,4999,0`
      );

      const result = importHerbsFromCSV(
        limitCSVPath
      );

      expect(result.errors.length).toBe(1);

      fs.unlinkSync(limitCSVPath);

    });

  });

  // =====================================================
  // MC/DC E CONDIÇÕES MÚLTIPLAS
  // =====================================================

  describe('MC/DC - Importação CSV', () => {

    test('Deve ignorar linhas vazias', () => {

      const blankCSVPath = path.join(
        __dirname,
        'fixtures',
        'blank-lines.csv'
      );

      fs.writeFileSync(
        blankCSVPath,

`Hortelã,23,60,15000,90

Alecrim,25,55,18000,120`
      );

      const result = importHerbsFromCSV(
        blankCSVPath
      );

      expect(result.success.length).toBe(2);

      fs.unlinkSync(blankCSVPath);

    });

    test('Deve processar mistura de linhas válidas e inválidas', () => {

      const result = importHerbsFromCSV(
        mixedCSVPath
      );

      expect(result.success.length).toBe(1);

      expect(result.errors.length).toBe(1);

    });

  });

});
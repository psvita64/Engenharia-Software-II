const { validateHerb } = require('../src/services/herbService');

describe('GREENHERB - Testes de Unidade - Herb Service', () => {

  // Erva válida
  test('Deve validar uma erva aromática válida', () => {
    const herb = {
      name: 'Hortelã',
      temperature: 23,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

// --- VALORES LIMITE: DURAÇÃO DO CICLO [1, 365] ---

  test('Deve rejeitar duração de ciclo abaixo do limite (0)', () => {
    const result = validateHerb({ name: 'Alecrim', temperature: 23, humidity: 60, luminosity: 15000, cycleDays: 0 });
    expect(result.valid).toBe(false);
  });

  test('Deve aceitar duração de ciclo no limite mínimo (1)', () => {
    const result = validateHerb({ name: 'Alecrim', temperature: 23, humidity: 60, luminosity: 15000, cycleDays: 1 });
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar duração de ciclo no limite máximo (365)', () => {
    const result = validateHerb({ name: 'Alecrim', temperature: 23, humidity: 60, luminosity: 15000, cycleDays: 365 });
    expect(result.valid).toBe(true);
  });

  test('Deve rejeitar duração de ciclo acima do limite (366)', () => {
    const result = validateHerb({ name: 'Alecrim', temperature: 23, humidity: 60, luminosity: 15000, cycleDays: 366 });
    expect(result.valid).toBe(false);
  });
  
  // --- TESTES DE CONDIÇÕES MÚLTIPLAS (CAIXA-BRANCA) ---
  
  test('Deve detetar múltiplos erros simultâneos (MCC)', () => {
    const herb = {
      name: '',            // Erro 1
      temperature: 10,     // Erro 2
      humidity: 90,        // Erro 3
      luminosity: 1000     // Erro 4
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Nome da erva é obrigatório');
    expect(result.errors).toContain('Temperatura fora do intervalo permitido');
    expect(result.errors).toContain('Humidade fora do intervalo permitido');
    expect(result.errors).toContain('Luminosidade fora do intervalo permitido');
    expect(result.errors.length).toBe(4);
  });

  // Nome vazio
  test('Deve rejeitar erva sem nome', () => {
    const herb = {
      name: '',
      temperature: 23,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Nome da erva é obrigatório');
  });

  // Valores limite da Temperatura
  test('Deve rejeitar temperatura abaixo do limite mínimo (17)', () => {
    const herb = {
      name: 'Manjericão',
      temperature: 17,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Temperatura fora do intervalo permitido');
  });

  test('Deve aceitar temperatura no limite mínimo (18)', () => {
    const herb = {
      name: 'Manjericão',
      temperature: 18,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar temperatura nominal (23)', () => {
    const herb = {
      name: 'Manjericão',
      temperature: 23,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar temperatura no limite máximo (28)', () => {
    const herb = {
      name: 'Manjericão',
      temperature: 28,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  test('Deve rejeitar temperatura acima do limite máximo (29)', () => {
    const herb = {
      name: 'Manjericão',
      temperature: 29,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Temperatura fora do intervalo permitido');
  });

  // Valores limite da Humidade
  test('Deve rejeitar humidade abaixo do limite mínimo (39)', () => {
    const herb = {
      name: 'Alecrim',
      temperature: 23,
      humidity: 39,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(false);
  });

  test('Deve aceitar humidade no limite mínimo (40)', () => {
    const herb = {
      name: 'Alecrim',
      temperature: 23,
      humidity: 40,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar humidade nominal (60)', () => {
    const herb = {
      name: 'Alecrim',
      temperature: 23,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  // --- VALORES LIMITE: JUSTIFICAÇÃO [10, 500] caracteres ---

  test('Deve rejeitar justificação com tamanho insuficiente (9)', () => {
    const result = validateHerb({ 
      name: 'Alecrim', temperature: 23, humidity: 60, luminosity: 15000, 
      justification: 'Curta...' 
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Justificação deve ter entre 10 e 500 caracteres');
  });

  test('Deve aceitar justificação no limite mínimo (10)', () => {
    const result = validateHerb({ 
      name: 'Alecrim', temperature: 23, humidity: 60, luminosity: 15000, 
      justification: 'Dez letras' 
    });
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar justificação no limite máximo (500)', () => {
    const longText = 'a'.repeat(500);
    const result = validateHerb({ 
      name: 'Alecrim', temperature: 23, humidity: 60, luminosity: 15000, 
      justification: longText 
    });
    expect(result.valid).toBe(true);
  });

  test('Deve rejeitar justificação acima do limite máximo (501)', () => {
    const tooLongText = 'a'.repeat(501);
    const result = validateHerb({ 
      name: 'Alecrim', temperature: 23, humidity: 60, luminosity: 15000, 
      justification: tooLongText 
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Justificação deve ter entre 10 e 500 caracteres');
  });

  test('Deve aceitar humidade no limite máximo (80)', () => {
    const herb = {
      name: 'Alecrim',
      temperature: 23,
      humidity: 80,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  test('Deve rejeitar humidade acima do limite máximo (81)', () => {
    const herb = {
      name: 'Alecrim',
      temperature: 23,
      humidity: 81,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(false);
  });

  // Valores limite da Luminosidade
  test('Deve rejeitar luminosidade abaixo do limite mínimo (4999)', () => {
    const herb = {
      name: 'Tomilho',
      temperature: 23,
      humidity: 60,
      luminosity: 4999
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(false);
  });

  test('Deve aceitar luminosidade no limite mínimo (5000)', () => {
    const herb = {
      name: 'Tomilho',
      temperature: 23,
      humidity: 60,
      luminosity: 5000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar luminosidade nominal (15000)', () => {
    const herb = {
      name: 'Tomilho',
      temperature: 23,
      humidity: 60,
      luminosity: 15000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  test('Deve aceitar luminosidade no limite máximo (25000)', () => {
    const herb = {
      name: 'Tomilho',
      temperature: 23,
      humidity: 60,
      luminosity: 25000
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(true);
  });

  test('Deve rejeitar luminosidade acima do limite máximo (25001)', () => {
    const herb = {
      name: 'Tomilho',
      temperature: 23,
      humidity: 60,
      luminosity: 25001
    };

    const result = validateHerb(herb);
    expect(result.valid).toBe(false);
  });

});

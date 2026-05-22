const { validatePlan } = require('../../src/services/planService');

describe('GREENHERB - Unit Tests - Plan Service', () => {

  // =====================================================
  // BASE VÁLIDA
  // =====================================================

  const validPlan = {
    type: 'regular',
    temperature: 23,
    humidity: 60,
    luminosity: 15000,
    duration: 90,
    authorizedByResponsible: false
  };

  // =====================================================
  // PARTICIONAMENTO DE EQUIVALÊNCIA
  // TIPO DE PLANO
  // =====================================================

  describe('Validação do Tipo de Plano', () => {

    test('Deve aceitar plano regular válido', () => {

      const result = validatePlan(validPlan);

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar plano de emergência válido', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'emergencia'
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar plano pontual com autorização', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'pontual',
        authorizedByResponsible: true
      });

      expect(result.valid).toBe(true);

    });

    test('Não deve exigir autorização para plano não pontual', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'emergencia',
        authorizedByResponsible: false
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar tipo de plano inválido', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'experimental'
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de plano inválido'
      );

    });

    test('Deve rejeitar tipo vazio', () => {

      const result = validatePlan({
        ...validPlan,
        type: ''
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Tipo de plano inválido'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE
  // TEMPERATURA [18, 28]
  // =====================================================

  describe('Valores Limite - Temperatura', () => {

    test('Deve rejeitar temperatura abaixo do limite (17)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 17
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Temperatura fora do intervalo permitido'
      );

    });

    test('Deve aceitar temperatura no limite mínimo (18)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 18
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar temperatura nominal (23)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 23
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar temperatura no limite máximo (28)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 28
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar temperatura acima do limite (29)', () => {

      const result = validatePlan({
        ...validPlan,
        temperature: 29
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Temperatura fora do intervalo permitido'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE
  // HUMIDADE [40, 80]
  // =====================================================

  describe('Valores Limite - Humidade', () => {

    test('Deve rejeitar humidade abaixo do limite (39)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 39
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Humidade fora do intervalo permitido'
      );

    });

    test('Deve aceitar humidade no limite mínimo (40)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 40
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar humidade nominal (60)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 60
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar humidade no limite máximo (80)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 80
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar humidade acima do limite (81)', () => {

      const result = validatePlan({
        ...validPlan,
        humidity: 81
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Humidade fora do intervalo permitido'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE
  // LUMINOSIDADE [5000, 25000]
  // =====================================================

  describe('Valores Limite - Luminosidade', () => {

    test('Deve rejeitar luminosidade abaixo do limite (4999)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 4999
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Luminosidade fora do intervalo permitido'
      );

    });

    test('Deve aceitar luminosidade no limite mínimo (5000)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 5000
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar luminosidade nominal (15000)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 15000
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar luminosidade no limite máximo (25000)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 25000
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar luminosidade acima do limite (25001)', () => {

      const result = validatePlan({
        ...validPlan,
        luminosity: 25001
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Luminosidade fora do intervalo permitido'
      );

    });

  });

  // =====================================================
  // VALORES LIMITE
  // DURAÇÃO [1, 365]
  // =====================================================

  describe('Valores Limite - Duração', () => {

    test('Deve rejeitar duração abaixo do limite (0)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 0
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Duração fora do intervalo permitido'
      );

    });

    test('Deve aceitar duração no limite mínimo (1)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 1
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar duração nominal (90)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 90
      });

      expect(result.valid).toBe(true);

    });

    test('Deve aceitar duração no limite máximo (365)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 365
      });

      expect(result.valid).toBe(true);

    });

    test('Deve rejeitar duração acima do limite (366)', () => {

      const result = validatePlan({
        ...validPlan,
        duration: 366
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Duração fora do intervalo permitido'
      );

    });

  });

  // =====================================================
  // CONDIÇÕES MÚLTIPLAS / MC/DC
  // =====================================================

  describe('MC/DC - Planos Pontuais', () => {

    test('Deve rejeitar plano pontual sem autorização', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'pontual',
        authorizedByResponsible: false
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Plano pontual exige autorização'
      );

    });

    test('Deve rejeitar plano pontual sem autorização e com temperatura inválida', () => {

      const result = validatePlan({
        ...validPlan,
        type: 'pontual',
        temperature: 30,
        authorizedByResponsible: false
      });

      expect(result.valid).toBe(false);

      expect(result.errors).toContain(
        'Plano pontual exige autorização'
      );

      expect(result.errors).toContain(
        'Temperatura fora do intervalo permitido'
      );

    });

  });

});

describe('Sprint 5 - Testes White-box: Validação de Plano Pontual', () => {

  // LINHA 1 DA TABELA: Tipo não é pontual, sem autorização (Deve aceitar se os limites estiverem OK)
  test('Linha 1: Deve aceitar plano regular mesmo sem autorização explícita', () => {
    const plan = {
      type: 'regular',
      temperature: 22,
      humidity: 60,
      luminosity: 15000,
      duration: 30,
      authorizedByResponsible: false
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
    expect(result.errors).not.toContain('Plano pontual exige autorização');
  });

  // LINHA 3 DA TABELA: Tipo é pontual, SEM autorização (Deve falhar/rejeitar)
  test('Linha 3: Deve rejeitar plano pontual se não houver autorização do Responsável Técnico', () => {
    const plan = {
      type: 'pontual',
      temperature: 22,
      humidity: 60,
      luminosity: 15000,
      duration: 30,
      authorizedByResponsible: false // C3: A=Verdadeiro, B=Falso -> Entra no IF
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Plano pontual exige autorização');
  });

  // LINHA 4 DA TABELA: Tipo é pontual, COM autorização (Deve aceitar)
  test('Linha 4: Deve aprovar plano pontual quando devidamente autorizado pelo Responsável', () => {
    const plan = {
      type: 'pontual',
      temperature: 22,
      humidity: 60,
      luminosity: 15000,
      duration: 30,
      authorizedByResponsible: true // C4: A=Verdadeiro, B=Verdadeiro -> Ignora o IF
    };

    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  // Fábrica de planos válidos para isolamento de variáveis
  const createValidBasePlan = () => ({
    type: 'regular',
    temperature: 22,
    humidity: 60,
    luminosity: 15000,
    duration: 30,
    authorizedByResponsible: false
  });

  // =========================================================================
  // TESTES DA DECISÃO: PLANO PONTUAL E AUTORIZAÇÃO (&&)
  // =========================================================================

  test('TU-WB-01 (Linha L1 da Tabela): Tipo regular (C1=F) e Sem Autorização (C2=F) -> Não deve dar erro', () => {
    const plan = createValidBasePlan();
    // C1 = Falso ('regular' !== 'pontual')
    // C2 = Falso (authorizedByResponsible: false)
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
    expect(result.errors).not.toContain('Plano pontual exige autorização');
  });

  test('TU-WB-02 (Linha L2 da Tabela): Tipo regular (C1=F) e Com Autorização (C2=V) -> Não deve dar erro', () => {
    const plan = createValidBasePlan();
    plan.type = 'emergencia'; // C1 = Falso
    plan.authorizedByResponsible = true; // C2 = Verdadeiro
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
    expect(result.errors).not.toContain('Plano pontual exige autorização');
  });

  test('TU-WB-03 (Linha L3 da Tabela): Tipo pontual (C1=V) e Sem Autorização (C2=F) -> DEVE REJEITAR', () => {
    const plan = createValidBasePlan();
    plan.type = 'pontual'; // C1 = Verdadeiro
    plan.authorizedByResponsible = false; // C2 = Falso (ativa o !plan.authorizedByResponsible)
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Plano pontual exige autorização');
  });

  test('TU-WB-04 (Linha L4 da Tabela): Tipo pontual (C1=V) e Com Autorização (C2=V) -> Deve aceitar', () => {
    const plan = createValidBasePlan();
    plan.type = 'pontual'; // C1 = Verdadeiro
    plan.authorizedByResponsible = true; // C2 = Verdadeiro
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });


  // =========================================================================
  // TESTES DE PARÂMETROS COM OPERADORES COMPOSTOS (||)
  // =========================================================================

  test('TU-WB-05: Tipo de plano inválido -> Deve entrar no desvio de tipo', () => {
    const plan = createValidBasePlan();
    plan.type = 'invalido';
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Tipo de plano inválido');
  });

  // --- TEMPERATURA ---
  test('TU-WB-06 (Linha L5): Temperatura abaixo do limite (< 18) -> Deve falhar', () => {
    const plan = createValidBasePlan();
    plan.temperature = 17; // C3 = V, C4 = F
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Temperatura fora do intervalo permitido');
  });

  test('TU-WB-07 (Linha L6): Temperatura acima do limite (> 28) -> Deve falhar', () => {
    const plan = createValidBasePlan();
    plan.temperature = 29; // C3 = F, C4 = V
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Temperatura fora do intervalo permitido');
  });

  test('TU-WB-15 : Temperatura Correta', () => {
    const plan = createValidBasePlan();
    plan.temperature = 20; // C3 = F, C4 = F
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Temperatura Correta');
  });
  // --- HUMIDADE ---
  test('TU-WB-08: Humidade abaixo do limite (< 40) -> Deve falhar', () => {
    const plan = createValidBasePlan();
    plan.humidity = 39;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Humidade fora do intervalo permitido');
  });

  test('TU-WB-09: Humidade acima do limite (> 80) -> Deve falhar', () => {
    const plan = createValidBasePlan();
    plan.humidity = 81;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Humidade fora do intervalo permitido');
  });
   test('TU-WB-016: Humidade Correta', () => {
    const plan = createValidBasePlan();
    plan.humidity = 50;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Humidade dentro do intervalo permitido');
  });


  // --- LUMINOSIDADE ---
  test('TU-WB-10: Luminosidade abaixo do limite (< 5000) -> Deve falhar', () => {
    const plan = createValidBasePlan();
    plan.luminosity = 4999;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Luminosidade fora do intervalo permitido');
  });

  test('TU-WB-11: Luminosidade acima do limite (> 25000) -> Deve falhar', () => {
    const plan = createValidBasePlan();
    plan.luminosity = 25001;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Luminosidade fora do intervalo permitido');
  });

   test('TU-WB-17: Luminosidade Correta', () => {
    const plan = createValidBasePlan();
    plan.luminosity = 24001;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Luminosidade Correto do intervalo permitido');
  });
  // --- DURAÇÃO ---
  test('TU-WB-12: Duração abaixo do limite (< 1) -> Deve falhar', () => {
    const plan = createValidBasePlan();
    plan.duration = 0;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Duração fora do intervalo permitido');
  });

  test('TU-WB-13: Duração acima do limite (> 365) -> Deve falhar', () => {
    const plan = createValidBasePlan();
    plan.duration = 366;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Duração fora do intervalo permitido');
  });

  
  test('TU-WB-18: Duração Correta', () => {
    const plan = createValidBasePlan();
    plan.duration = 300;
    
    const result = validatePlan(plan);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Duração dentro do intervalo permitido');
  });

  // =========================================================================
  // COBERTURA DE CAMINHOS COMBINADOS E ACUMULAÇÃO DE ERROS
  // =========================================================================
  test('TU-WB-14: Múltiplos caminhos simultâneos -> Deve acumular todos os erros possíveis', () => {
    const catastrophicPlan = {
      type: 'invalido',
      temperature: 5,
      humidity: 95,
      luminosity: 100,
      duration: 400,
      authorizedByResponsible: false
    };

    const result = validatePlan(catastrophicPlan);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(5); // Valida que passou por todas as decisões sequenciais
  });
});

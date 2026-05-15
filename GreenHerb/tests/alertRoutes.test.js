const request = require('supertest');
const app = require('../src/app');

describe('GREENHERB - Testes de endpoint /alerts', () => {
  const limits = { minT: 18, maxT: 28, minH: 40, maxH: 80 };

  test('Deve classificar alerta como Normal', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 24,
        humidity: 60,
        limits,
        sensorOK: true
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Normal');
  });

  test('Deve classificar alerta como Aviso', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 29,
        humidity: 60,
        limits,
        sensorOK: true
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Aviso');
  });

  test('Deve classificar alerta como Crítico por temperatura', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 34,
        humidity: 60,
        limits,
        sensorOK: true
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Crítico');
  });

  test('Deve classificar alerta como Crítico por humidade', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 24,
        humidity: 10,
        limits,
        sensorOK: true
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Crítico');
  });

  test('Deve classificar alerta como Informativo quando sensor está com problema', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 50,
        humidity: 10,
        limits,
        sensorOK: false
      });

    expect(response.status).toBe(200);
    expect(response.body.severity).toBe('Informativo');
  });

  test('Deve rejeitar alerta sem limites', async () => {
    const response = await request(app)
      .post('/alerts')
      .send({
        temperature: 25,
        humidity: 55,
        sensorOK: true
      });

    expect(response.status).toBe(400);
    expect(response.body.details).toContain('Limites são obrigatórios');
  });
});

describe('Testes de Sistema - Fluxo de Gestão de Incidentes Ambientais (E2E)', () => {
  const limitesEstufa = { minT: 18, maxT: 28, minH: 40, maxH: 80 };

  test('Fluxo E2E: Entrada de valores críticos deve desencadear severidade Crítica instantaneamente', async () => {
    
    // 1. O sensor envia uma leitura de humidade perigosamente baixa para a estufa (15%)
    // Valores Limite da Lógica: 15% está abaixo de (minH - 20) -> 40 - 20 = 20%
    const respostaSensor = await request(app)
      .post('/alerts')
      .send({
        temperature: 22,
        humidity: 15, // Humidade Crítica!
        limits: limitesEstufa,
        sensorOK: true
      });

    // 2. O Sistema processa e responde ao exterior com o estado crítico do ecossistema
    expect(respostaSensor.status).toBe(200);
    expect(respostaSensor.body.severity).toBe('Crítico');
    
    // Nota para o Relatório: Num cenário real com base de dados ligada, 
    // o passo 3 deste teste de sistema seria fazer um GET /api/audit 
    // para verificar se este incidente gerou um log automático.
  });

  test('Fluxo E2E: Desconexão ou falha de hardware do sensor deve gerar Alerta Informativo', async () => {
    
    // 1. Sensor reporta ao endpoint que está com uma falha de leitura (sensorOK: false)
    const respostaFalhaHardware = await request(app)
      .post('/alerts')
      .send({
        temperature: 0, // Valor irrelevante devido à falha
        humidity: 0,
        limits: limitesEstufa,
        sensorOK: false
      });

    // 2. O sistema deteta o perigo de falta de dados e prioriza o alerta de manutenção
    expect(respostaFalhaHardware.status).toBe(200);
    expect(respostaFalhaHardware.body.severity).toBe('Informativo');
  });
});

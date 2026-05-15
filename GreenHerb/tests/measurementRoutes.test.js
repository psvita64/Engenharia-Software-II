const request = require('supertest');
const app = require('../src/app'); // Importa a tua app Express global
const { validateMeasurement } = require('../src/services/measurementService');

/* ==========================================================================
   1. TESTES DE UNIDADE (Nível 1) - Validação Lógica Isolada
   ========================================================================= */
describe('GREENHERB - Testes de Unidade: Validação de Medições', () => {

  // --- 1.1. PARTICIONAMENTO DE EQUIVALÊNCIA ---
  test('Deve validar com sucesso uma medição com todos os dados corretos', () => {
    const medicaoValida = {
      sensorId: 'SNS-DHT22-01',
      type: 'temperatura',
      value: 24.5,
      unit: '°C',
      timestamp: '2026-05-15T14:30:00.000Z'
    };

    const resultado = validateMeasurement(medicaoValida);
    expect(resultado.valid).toBe(true);
    expect(resultado.errors.length).toBe(0);
  });

  test('Deve rejeitar se o sensorId ou o tipo de medição estiverem vazios', () => {
    const medicaoInvalida = {
      sensorId: '   ', // Apenas espaços
      type: '',        // String vazia
      value: 55,
      unit: '%',
      timestamp: '2026-05-15T14:30:00.000Z'
    };

    const resultado = validateMeasurement(medicaoInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('SensorId é obrigatório');
    expect(resultado.errors).toContain('Tipo de medição é obrigatório');
  });

  test('Deve rejeitar se o valor da medição não for numérico', () => {
    const medicaoInvalida = {
      sensorId: 'SNS-DHT22-01',
      type: 'humidade',
      value: '55', // String em vez de número
      unit: '%',
      timestamp: '2026-05-15T14:30:00.000Z'
    };

    const resultado = validateMeasurement(medicaoInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Valor da medição deve ser numérico');
  });

  test('Deve rejeitar se a unidade de medição estiver em falta', () => {
    const medicaoInvalida = {
      sensorId: 'SNS-DHT22-01',
      type: 'temperatura',
      value: 22,
      unit: '', // Vazio
      timestamp: '2026-05-15T14:30:00.000Z'
    };

    const resultado = validateMeasurement(medicaoInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Unidade de medição é obrigatória');
  });

  test('Deve rejeitar se o formato do timestamp for inválido', () => {
    const medicaoInvalida = {
      sensorId: 'SNS-DHT22-01',
      type: 'temperatura',
      value: 20,
      unit: '°C',
      timestamp: 'not-a-date'
    };

    const resultado = validateMeasurement(medicaoInvalida);
    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain('Timestamp inválido');
  });
});

/* ==========================================================================
   2. TESTES DE INTEGRAÇÃO (Nível 2) - Contratos da Rota HTTP
   ========================================================================= */
describe('GREENHERB - Testes de Integração: Rota POST /measurements', () => {

  test('POST /measurements -> Deve responder 201 Created quando o payload estrutural for válido', async () => {
    const response = await request(app)
      .post('/measurements')
      .send({
        sensorId: 'SNS-LUX-04',
        type: 'luminosidade',
        value: 450,
        unit: 'lux',
        timestamp: new Date().toISOString()
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Medição registada com sucesso!');
    expect(response.body).toHaveProperty('measurement');
  });

  test('POST /measurements -> Deve responder 400 Bad Request se houver falha de dados', async () => {
    const response = await request(app)
      .post('/measurements')
      .send({
        sensorId: '',
        type: 'co2',
        value: undefined, // Inválido
        unit: 'ppm',
        timestamp: '2026-05-15'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Dados de medição inválidos');
    expect(response.body.details.length).toBeGreaterThan(0);
  });
});

/* ==========================================================================
   3. TESTES DE SISTEMA (Nível 3) - Fluxo End-to-End (E2E)
   ========================================================================= */
describe('GREENHERB - Testes de Sistema: Fluxo Contínuo de Telemetria E2E', () => {

  test('Fluxo E2E: Envio sequencial de telemetria por parte de um sensor físico da estufa', async () => {
    const timestampBase = new Date();

    // Passo 1: O Sensor envia a primeira medição de rotina (ex: Temperatura às 14:30)
    const leitura1 = await request(app)
      .post('/measurements')
      .send({
        sensorId: 'ESTUFA-NODE-01',
        type: 'temperatura',
        value: 24.1,
        unit: '°C',
        timestamp: timestampBase.toISOString()
      });

    expect(leitura1.status).toBe(201);
    expect(leitura1.body.measurement.value).toBe(24.1);

    // Passo 2: Cinco minutos depois, o mesmo sensor envia a atualização seguinte
    // O sistema deve continuar a aceitar e processar as strings de telemetria continuamente
    timestampBase.setMinutes(timestampBase.getMinutes() + 5);

    const leitura2 = await request(app)
      .post('/measurements')
      .send({
        sensorId: 'ESTUFA-NODE-01',
        type: 'temperatura',
        value: 24.3, // Temperatura alterou ligeiramente
        unit: '°C',
        timestamp: timestampBase.toISOString()
      });

    expect(leitura2.status).toBe(201);
    expect(leitura2.body.measurement.value).toBe(24.3);
  });
});

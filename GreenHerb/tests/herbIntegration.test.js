const request = require('supertest');
const app = require('../src/app'); // O teu ficheiro onde está o express
const fs = require('fs');
const path = require('path');

describe('GREENHERB - Testes de Integração - Importação CSV', () => {
  const testFilePath = path.join(__dirname, 'test_catalogo.csv');

  // Criar um ficheiro de teste antes de começar
  // Dentro do teu describe de integração
beforeAll(() => {
  // CORREÇÃO: Adicionar Ciclo (90) e Justificação (texto longo) a cada linha
  const csvContent = 
    'Manjericão,25,60,15000,90,Justificacao valida para importacao\n' +
    'Alecrim,23,40,18000,120,Segunda justificacao obrigatoria';
  fs.writeFileSync(testFilePath, csvContent);
});

  // Apagar o ficheiro depois dos testes
  afterAll(() => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test('Deve importar um ficheiro CSV válido com sucesso', async () => {
    const response = await request(app)
      .post('/herbs/import')
      .attach('file', testFilePath); // Simula o upload do ficheiro

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Processamento concluído');
    expect(response.body.details.length).toBe(2);
  });

  test('Deve rejeitar se nenhum ficheiro for enviado', async () => {
    const response = await request(app)
      .post('/herbs/import');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nenhum ficheiro enviado');
  });
});
const {
  processEnvironmentMeasurement
} = require('../../src/services/environmentMonitorService');

jest.mock(
  '../../src/services/gateways/measurementGateway',
  () => ({
    getMeasurementFromSensor: jest.fn()
  })
);

jest.mock(
  '../../src/services/gateways/notificationGateway',
  () => ({
    sendNotification: jest.fn()
  })
);

const {
  getMeasurementFromSensor
} = require('../../src/services/gateways/measurementGateway');

const {
  sendNotification
} = require('../../src/services/gateways/notificationGateway');

describe('Sprint 6 - Mocks e Stubs', () => {

  test(
    'Deve enviar notificação quando temperatura excede limite',
    () => {

      // STUB
      getMeasurementFromSensor.mockReturnValue({
        sensorId: 'TEMP-01',
        type: 'temperatura',
        value: 35,
        unit: '°C',
        timestamp: '2026-05-01T10:00:00'
      });

      processEnvironmentMeasurement();

      // MOCK
      expect(sendNotification).toHaveBeenCalled();

    }
  );

});
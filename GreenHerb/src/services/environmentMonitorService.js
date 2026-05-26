const {
  getMeasurementFromSensor
} = require('./gateways/measurementGateway');

const {
  sendNotification
} = require('./gateways/notificationGateway');

const {
  classifyAlert
} = require('./alertService');

const processEnvironmentMeasurement = () => {

  const measurement =
    getMeasurementFromSensor();

  const limits = {
    minT: 18,
    maxT: 28,
    minH: 40,
    maxH: 80
  };

  const result =
    classifyAlert(
      measurement.value,
      50, 
      limits,
      true
    );

  if (
    result.severity === 'Aviso' ||
    result.severity === 'Crítico'
  ) {

    sendNotification(
      `Alerta ${result.severity}: Temperatura fora dos limites`
    );

    return {
      alert: true,
      severity: result.severity
    };

  }

  return {
    alert: false,
    severity: result.severity
  };

};

module.exports = {
  processEnvironmentMeasurement
};
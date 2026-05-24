const {
  getMeasurementFromSensor
} = require('./gateways/measurementGateway');

const {
  sendNotification
} = require('./gateways/notificationGateway');

const processEnvironmentMeasurement = () => {

  const measurement =
    getMeasurementFromSensor();

  if (measurement.value > 28) {

    sendNotification(
      'Temperatura acima do limite'
    );

    return {
      alert: true
    };

  }

  return {
    alert: false
  };

};

module.exports = {
  processEnvironmentMeasurement
};
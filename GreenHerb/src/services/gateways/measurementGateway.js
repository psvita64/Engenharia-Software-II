const getMeasurementFromSensor = () => {

  return {
    sensorId: 'TEMP-01',
    type: 'temperatura',
    value: 35,
    unit: '°C',
    timestamp: new Date().toISOString()
  };

};

module.exports = {
  getMeasurementFromSensor
};
const validateReportRequest = (report) => {
  const errors = [];
  const validTypes = ['daily', 'weekly', 'monthly', 'custom'];

  if (!report.type || !validTypes.includes(report.type)) {
    errors.push('Tipo de relatório inválido');
  }

  if (!report.from || isNaN(Date.parse(report.from))) {
    errors.push('Data inicial inválida');
  }

  if (!report.to || isNaN(Date.parse(report.to))) {
    errors.push('Data final inválida');
  }

  if (report.from && report.to && Date.parse(report.from) > Date.parse(report.to)) {
    errors.push('Intervalo de datas inválido');
  }

  return { valid: errors.length === 0, errors };
};

module.exports = { validateReportRequest };

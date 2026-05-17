const validateReportRequest = (report) => {
  const errors = [];
  const VALID_REPORT_TYPES = ['daily', 'weekly', 'monthly', 'custom'];

  if (!report.type || !VALID_REPORT_TYPES.includes(report.type)) {
    errors.push('Tipo de relatório inválido');
  }

  if (!report.from || typeof report.from !== 'string' || isNaN(Date.parse(report.from))) {
    errors.push('Data inicial inválida');
  }

  if (!report.to || typeof report.to !== 'string' || isNaN(Date.parse(report.to))) {
    errors.push('Data final inválida');
  }

  const fromDate = Date.parse(report.from);
  const toDate = Date.parse(report.to);

  if (!isNaN(fromDate) && !isNaN(toDate) && fromDate > toDate) {
    errors.push('Intervalo de datas inválido');
  }

  return { valid: errors.length === 0, errors };
};

module.exports = { validateReportRequest };

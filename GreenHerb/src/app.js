const express = require('express');
const app = express();

app.use(express.json());

// =====================================
// Routes
// =====================================

const authRoutes = require('./routes/authRoutes');
const herbRoutes = require('./routes/herbRoutes');
const planRoutes = require('./routes/planRoutes');
const batchRoutes = require('./routes/batchRoutes');
const taskRoutes = require('./routes/taskRoutes');
const measurementRoutes = require('./routes/measurementRoutes');
const alertRoutes = require('./routes/alertRoutes');
const automationRoutes = require('./routes/automationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const auditRoutes = require('./routes/auditRoutes');

// =====================================
// Route registration
// =====================================

app.use('/auth', authRoutes);
app.use('/herbs', herbRoutes);
app.use('/plans', planRoutes);
app.use('/batches', batchRoutes);
app.use('/tasks', taskRoutes);
app.use('/measurements', measurementRoutes);
app.use('/alerts', alertRoutes);
app.use('/automation', automationRoutes);
app.use('/reports', reportRoutes);
app.use('/audit', auditRoutes);

module.exports = app;
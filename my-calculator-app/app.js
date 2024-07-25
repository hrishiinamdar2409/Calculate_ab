// app.js
const express = require('express');
const connectDB = require('./config/database');
const logRoutes = require('./routes/logRoutes');
const logger = require('./utils/logger');
const cors=require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', logRoutes);

app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    logger.info(`Response: ${res.statusCode} ${body}`);
    originalSend.apply(res, arguments);
  };
  next();
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});

// controllers/logController.js
const CalculatorLog = require('../models/calculatorLog');
const logger = require('../utils/logger');

exports.addLog = async (req, res) => {
  const { expression, isValid, output } = req.body;

  if (!expression) {
    logger.info('Empty expression provided');
    return res.status(400).send({ error: 'Expression is empty' });
  }

  try {
    const log = await CalculatorLog.create({
      expression,
      is_valid: isValid,
      output
    });
    console.log("hii");
    logger.info(`Expression logged: ${expression}`);
    res.status(201).send(log);
  } catch (error) {
    console.log(error);
    logger.error(`Error logging expression: ${error.message}`);
    res.status(500).send({ error: 'Failed to log expression' });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await CalculatorLog.find().sort({ created_on: -1 }).limit(10);
    logger.info('Fetched last 10 logs');
    res.send(logs);
  } catch (error) {
    logger.error(`Error fetching logs: ${error.message}`);
    res.status(500).send({ error: 'Failed to fetch logs' });
  }
};

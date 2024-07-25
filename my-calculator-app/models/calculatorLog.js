// models/calculatorLog.js
const mongoose = require('mongoose');

const calculatorLogSchema = new mongoose.Schema({
  expression: {
    type: String,
    required: true,
    maxlength: 500,
  },
  is_valid: {
    type: Boolean,
    required: true,
  },
  output: {
    type: Number,
    required: false,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
});

const CalculatorLog = mongoose.model('CalculatorLog', calculatorLogSchema);

module.exports = CalculatorLog;

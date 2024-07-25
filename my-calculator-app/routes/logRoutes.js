// routes/logRoutes.js
const express = require('express');
const { addLog, getLogs } = require('../controllers/logController');
const router = express.Router();

router.post('/logs', addLog);
router.get('/logs', getLogs);

module.exports = router;

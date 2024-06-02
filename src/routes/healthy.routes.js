// routes/healthRoutes.js
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

// Ruta de salud
router.get('/', healthController.getHealthStatus);

module.exports = router;

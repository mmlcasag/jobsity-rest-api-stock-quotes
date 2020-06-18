const express = require('express');

const controllers = require('../controllers/controllers');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/auth', controllers.authenticate);
router.post('/stock', authMiddleware, controllers.getStockQuote);

module.exports = router;
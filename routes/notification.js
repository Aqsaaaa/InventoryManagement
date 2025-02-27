const express = require('express');
const router = express.Router();
const { getLowStockItems } = require('../controllers/notifController');

router.get('/', getLowStockItems);


module.exports = router;

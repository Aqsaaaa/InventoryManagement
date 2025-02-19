const express = require('express');
const router = express.Router();
const { getStatus } = require('../controllers/statusController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken,getStatus);

module.exports = router;

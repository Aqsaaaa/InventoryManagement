const express = require('express');
const router = express.Router();
const { addHistory,getHistory,getHistoryByItemId } = require('../controllers/historyController');

router.post('/', addHistory);
router.get('/', getHistory);
router.get('/:id', getHistoryByItemId);

module.exports = router;

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  getItemById,
} = require('../controllers/itemController');

router.get('/', verifyToken, getItems);
router.get('/:id', verifyToken, getItemById);
router.post('/', verifyToken, addItem);
router.put('/:id', verifyToken, updateItem);
router.delete('/:id', verifyToken, deleteItem);

module.exports = router;

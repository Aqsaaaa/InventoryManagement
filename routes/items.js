const express = require("express");
const { getItems, addItem } = require("../controllers/itemController");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getItems);
router.post("/", upload.single("image"), addItem);

module.exports = router;

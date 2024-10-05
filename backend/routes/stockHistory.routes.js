const express = require("express");
const { scrapeStockHistory } = require("../services/stockHistory");
// const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.post("/history", scrapeStockHistory);

module.exports = router;

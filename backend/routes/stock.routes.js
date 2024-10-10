const express = require("express");
const { scrapeStockHistory } = require("../services/stockHistory");
const { scrapePageData } = require("../services/scrapePageContents");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.post("/history", protectRoute, scrapeStockHistory);
router.post("/page", scrapePageData);

module.exports = router;

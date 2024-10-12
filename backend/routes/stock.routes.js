const express = require("express");
const { scrapeStockHistory } = require("../services/stockHistory");
const { scrapePageData } = require("../services/scrapePageContents");
const { sendScrapedData } = require("../services/scrapeStockTable");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.post("/history", protectRoute, scrapeStockHistory);
router.post("/page", protectRoute, scrapePageData);
router.post("/table", protectRoute, sendScrapedData);

module.exports = router;

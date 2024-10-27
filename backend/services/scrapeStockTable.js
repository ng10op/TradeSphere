const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const User = require("../models/user.model");

const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless=old");

async function scrapeStockTable() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    const url = "https://www.etmoney.com/stocks/list-of-stocks";
    await driver.get(url);
    await driver.sleep(5000);

    async function clickShowMore(times) {
      for (let i = 0; i < times; i++) {
        try {
          const showMoreButton = await driver.findElement(
            By.css("button.flex.mweb\\:bg-white")
          );
          await showMoreButton.click();
          await driver.sleep(1000);
        } catch (error) {
          console.log("Error clicking 'Show more':", error);
          break;
        }
      }
    }

    await clickShowMore(17);

    const table = await driver.findElement(By.tagName("table"));
    const data = [];
    const headers = [];
    const rows = await table.findElements(By.tagName("tr"));

    const headerElements = await rows[0].findElements(By.tagName("th"));
    for (const header of headerElements) {
      headers.push(await header.getText());
    }

    for (let i = 1; i < rows.length; i++) {
      const cells = await rows[i].findElements(By.tagName("td"));
      const rowData = {};
      for (let j = 0; j < cells.length; j++) {
        let cellText = await cells[j].getText();
        rowData[headers[j]] = cellText;
      }
      if (Object.keys(rowData).length > 0) {
        data.push(rowData);
      }
    }

    return data;
  } finally {
    await driver.quit();
  }
}

async function sendScrapedData(req, res) {
  const { email } = req.body;

  try {
    const scrapedData = await scrapeStockTable();

    const stocks = scrapedData.map((stock) => ({
      companyName: stock.Company,
      ltp: stock["LTP (₹)"],
      oneDReturn: stock["1D Return %"],
      marketCap: stock["Market Cap (Cr)"],
      highLow52W: stock["52W High / Low (₹)"],
      volume: stock.Volume,
    }));

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found, please Signup!" });
    }

    user.stocks = stocks;
    await user.save();

    res.status(200).json(user.stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to scrape stock data." });
  }
}

module.exports = { scrapeStockTable, sendScrapedData };

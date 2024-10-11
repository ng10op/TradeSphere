// Existing imports
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Set up Chrome options
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless=old");

// Function to scrape stock data and return it in JSON format
async function scrapeStockTable() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    const url = "https://www.etmoney.com/stocks/list-of-stocks";
    await driver.get(url);
    await driver.sleep(5000); // Wait for the page to load

    // Function to click "Show more" button
    async function clickShowMore(times) {
      for (let i = 0; i < times; i++) {
        try {
          const showMoreButton = await driver.findElement(
            By.css("button.flex.mweb\\:bg-white")
          );
          await showMoreButton.click();
          await driver.sleep(1000); // Wait a second before clicking again
        } catch (error) {
          console.log("Error clicking 'Show more':", error);
          break;
        }
      }
    }

    await clickShowMore(17); // Load more rows

    // Locate the table and extract data
    const table = await driver.findElement(By.tagName("table"));
    const data = [];
    const headers = [];
    const rows = await table.findElements(By.tagName("tr"));

    // Extract headers
    const headerElements = await rows[0].findElements(By.tagName("th"));
    for (const header of headerElements) {
      headers.push(await header.getText());
    }

    // Extract data from each row
    for (let i = 1; i < rows.length; i++) {
      const cells = await rows[i].findElements(By.tagName("td"));
      const rowData = {};
      for (let j = 0; j < cells.length; j++) {
        let cellText = await cells[j].getText();
        // Keep all values as strings
        rowData[headers[j]] = cellText; // Store as string directly
      }
      if (Object.keys(rowData).length > 0) {
        data.push(rowData);
      }
    }

    // Return the scraped data as JSON
    return data;
  } finally {
    await driver.quit();
  }
}

// New function to handle sending data with status codes
async function sendScrapedData(req, res) {
  try {
    const scrapedData = await scrapeStockTable();
    res.status(200).json(scrapedData); // Respond with 200 and the scraped data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to scrape stock data." }); // Respond with 500 on error
  }
}

// Export the functions so they can be used in other parts of the app
module.exports = { scrapeStockTable, sendScrapedData };

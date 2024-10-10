const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const scrapePageData = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({ error: "Company name is required" });
    }

    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--headless=old");

    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();

    try {
      const url = "https://www.etmoney.com/stocks/list-of-stocks";
      await driver.get(url);

      // Input the company name into the search bar
      await driver.wait(
        until.elementLocated(By.id("desktop-search-container")),
        20000
      );

      let searchBar = await driver.findElement(
        By.css("#desktop-search-container input")
      );
      await searchBar.sendKeys(companyName);

      // Wait for dropdown suggestions and click the first suggestion
      await driver.sleep(2000);
      let firstSuggestion = await driver.findElement(
        By.css("ul.custom-scrollbar li:first-child")
      );
      await firstSuggestion.click();

      // Wait for the new page to load
      await driver.sleep(5000);

      // Click "Read More" button if it exists
      try {
        let readMoreButton = await driver.wait(
          until.elementLocated(
            By.css(
              "button.text-primary-green.font-proximaNovaSemibold.text-sm.mt-4"
            )
          ),
          10000
        );
        await readMoreButton.click();
      } catch (error) {
        console.log("No 'Read More' button found:", error);
      }

      // Extract data from the page
      let aboutSections = await driver.findElements(
        By.css("div.relative.shadow-shadow-1.bg-white.w-full.overflow-hidden")
      );

      let stockData = {};
      for (let i = 0; i < aboutSections.length; i++) {
        let sectionText = await aboutSections[i].getText();
        stockData[`section_${i + 1}`] = sectionText;
      }

      // Return the data as a JSON response
      return res.status(200).json({
        company: companyName,
        data: stockData,
      });
    } finally {
      await driver.quit();
    }
  } catch (error) {
    console.log("Error in scraping stock data:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching stock data",
    });
  }
};

module.exports = { scrapePageData };

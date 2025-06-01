const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const scrapePageData = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({ error: "Company name is required" });
    }

    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--headless");

    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();

    try {
      const url = "https://www.etmoney.com/stocks/list-of-stocks";
      await driver.get(url);

      await driver.wait(
        until.elementLocated(By.id("desktop-search-container")),
        20000
      );

      let searchBar = await driver.findElement(
        By.css("#desktop-search-container input")
      );
      await searchBar.sendKeys(companyName);

      await driver.sleep(2000);
      let firstSuggestion = await driver.findElement(
        By.css("ul.custom-scrollbar li:first-child")
      );
      await firstSuggestion.click();

      await driver.sleep(5000);

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

      let aboutSections = await driver.findElements(
        By.css("div.relative.shadow-shadow-1.bg-white.w-full.overflow-hidden")
      );

      let stockData = {};
      for (let i = 0; i < aboutSections.length; i++) {
        let sectionHtml = await aboutSections[i].getAttribute("innerHTML");

        sectionHtml = sectionHtml.replace(/class=/g, "className=");

        stockData[`section_${i + 1}`] = sectionHtml;
      }

      let faqData = [];

      try {
        const faqScript = await driver.findElement(By.css("script#faq-schema"));
        const faqJsonText = await faqScript.getAttribute("innerHTML");

        const faqJson = JSON.parse(faqJsonText);

        if (faqJson.mainEntity && Array.isArray(faqJson.mainEntity)) {
          faqData = faqJson.mainEntity.map((item) => ({
            question: item.name || item.question,
            answer: item.acceptedAnswer?.text || "No answer available",
          }));
        }
      } catch (err) {
        console.log("Error extracting FAQ JSON:", err.message);
      }

      return res.status(200).json({
        company: companyName,
        data: stockData,
        faqs: faqData,
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

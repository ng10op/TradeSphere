const fs = require("fs");
const csv = require("csv-parser");
const yahooFinance = require("yahoo-finance2").default;
const path = require("path");

const csvFilePath = path.join(__dirname, "AllStocksSymbols.csv");

const companies = [];

const loadCompanies = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => companies.push(row))
      .on("end", () => resolve(companies))
      .on("error", (error) => reject(error));
  });
};

const getSymbolAndDate = (companyName) => {
  const formattedCompanyName = companyName.replace("Ltd.", "Limited");

  const found = companies.find((company) =>
    company["NAME OF COMPANY"]
      .toLowerCase()
      .includes(formattedCompanyName.toLowerCase())
  );
  return found
    ? { symbol: found["SYMBOL"], dateOfListing: found[" DATE OF LISTING"] }
    : null;
};

const scrapeStockHistory = async (req, res) => {
  try {
    const { companyName } = req.body;

    await loadCompanies();

    const result = getSymbolAndDate(companyName);

    if (result) {
      const { symbol, dateOfListing } = result;

      if (!dateOfListing) {
        return res.status(404).json({
          error: `No date of listing found for company: ${companyName}`,
        });
      }

      const listingDate = new Date(dateOfListing.split("-").reverse().join(" "))
        .toISOString()
        .split("T")[0];

      const data = await yahooFinance.historical(symbol + ".NS", {
        period1: listingDate,
        period2: new Date().toISOString().split("T")[0],
        interval: "1d",
      });

      const formattedData = data.map((item) => ({
        Date: item.date.toISOString().split("T")[0],
        Open: item.open,
        High: item.high,
        Low: item.low,
        Close: item.close,
        Volume: item.volume,
      }));

      return res.json(formattedData);
    } else {
      return res
        .status(404)
        .json({ error: `Symbol not found for company: ${companyName}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { scrapeStockHistory };

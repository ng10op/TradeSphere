const fs = require("fs");
const csv = require("csv-parser");
const yahooFinance = require("yahoo-finance2").default;
const path = require("path");

// Path to your CSV file
const csvFilePath = path.join(__dirname, "AllStocksSymbols.csv");

// Load the CSV file into an array of objects
const companies = [];

// Load companies from CSV
const loadCompanies = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => companies.push(row))
      .on("end", () => resolve(companies))
      .on("error", (error) => reject(error));
  });
};

// Function to get the symbol and date of listing for a given company name
const getSymbolAndDate = (companyName) => {
  // Replace 'Ltd.' with 'Limited' in the company name for matching
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

// Function to scrape stock data based on company name
const scrapeStockHistory = async (req, res) => {
  try {
    const { companyName } = req.body; // Extract the company name from the request body

    // Load companies from CSV
    await loadCompanies();

    // Get the symbol and date of listing for the company
    const result = getSymbolAndDate(companyName);

    if (result) {
      const { symbol, dateOfListing } = result;

      // Check if dateOfListing is defined before proceeding
      if (!dateOfListing) {
        return res.status(404).json({
          error: `No date of listing found for company: ${companyName}`,
        });
      }

      // Convert date of listing from "DD-MMM-YYYY" to "YYYY-MM-DD"
      const listingDate = new Date(dateOfListing.split("-").reverse().join(" "))
        .toISOString()
        .split("T")[0];

      // Download stock data using yahoo-finance2
      const data = await yahooFinance.historical(symbol + ".NS", {
        period1: listingDate, // Start date from the listing date
        period2: new Date().toISOString().split("T")[0], // End date
        interval: "1d", // Daily data
      });

      // Format the data for JSON response
      const formattedData = data.map((item) => ({
        Date: item.date.toISOString().split("T")[0],
        Open: item.open,
        High: item.high,
        Low: item.low,
        Close: item.close,
        Volume: item.volume,
      }));

      return res.json(formattedData); // Return the formatted data in JSON format
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

module.exports = { scrapeStockHistory }; // Export the function

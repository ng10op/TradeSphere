// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     currLogin: {
//       type: Date,
//     },
//     prevLogin: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

// Define the stock schema
const stockSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    ltp: {
      type: String, // Changed to String
      required: true,
    },
    oneDReturn: {
      type: String, // Changed to String
      required: true,
    },
    marketCap: {
      type: String, // Changed to String
      required: true,
    },
    highLow52W: {
      type: String, // Changed to String
      required: true,
    },
    volume: {
      type: String, // Changed to String
      required: true,
    },
  },
  { timestamps: true }
);

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    currLogin: {
      type: Date,
    },
    prevLogin: {
      type: Date,
    },
    stocks: [stockSchema], // Embedding stock data in the user schema
  },
  { timestamps: true }
);

// Export the user model
module.exports = mongoose.model("User", userSchema);

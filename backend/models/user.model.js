const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    ltp: {
      type: String,
      required: true,
    },
    oneDReturn: {
      type: String,
      required: true,
    },
    marketCap: {
      type: String,
      required: true,
    },
    highLow52W: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

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
    stocks: [stockSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

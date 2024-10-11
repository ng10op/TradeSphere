const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    ltp: {
      type: Number,
      required: true,
    },
    oneDReturn: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    highLow52W: {
      high: {
        type: Number,
        required: true,
      },
      low: {
        type: Number,
        required: true,
      },
    },
    volume: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);

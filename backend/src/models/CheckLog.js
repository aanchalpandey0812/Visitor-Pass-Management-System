const mongoose = require("mongoose");

const checkLogSchema = new mongoose.Schema(
  {
    pass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pass",
      required: true,
    },

    checkInTime: {
      type: Date,
    },

    checkOutTime: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "CHECKED_IN",
        "CHECKED_OUT",
      ],
      default: "CHECKED_IN",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CheckLog",
  checkLogSchema
);
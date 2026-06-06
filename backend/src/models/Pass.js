const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
  {
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    passNumber: {
      type: String,
      unique: true,
      required: true,
    },

    qrCode: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "USED",
        "EXPIRED"
      ],
      default: "ACTIVE",
    },

    validTill: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model("Pass", passSchema);
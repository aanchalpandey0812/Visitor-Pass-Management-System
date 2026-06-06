const Pass = require("../models/Pass");
const QRCode = require("qrcode");

// Generate Pass
exports.generatePass = async (
  req,
  res
) => {
  try {
    const {
      visitor,
      appointment,
      validTill,
    } = req.body;

    const passNumber =
      "VP-" +
      Date.now();

    const qrData = JSON.stringify({
      passNumber,
      visitor,
    });

    const qrCode =
      await QRCode.toDataURL(
        qrData
      );

    const pass =
      await Pass.create({
        visitor,
        appointment,
        passNumber,
        qrCode,
        validTill,
      });

    res.status(201).json({
      success: true,
      pass,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// Get All Passes
exports.getPasses = async (
  req,
  res
) => {
  try {
    const passes =
      await Pass.find()
        .populate("visitor")
        .populate(
          "appointment"
        );

    res.status(200).json({
      success: true,
      passes,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// Get Single Pass
exports.getPassById =
  async (req, res) => {
    try {
      const pass =
        await Pass.findById(
          req.params.id
        );

      if (!pass) {
        return res.status(404).json({
          message:
            "Pass not found",
        });
      }

      res.status(200).json({
        success: true,
        pass,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
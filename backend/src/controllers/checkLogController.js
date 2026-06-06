const CheckLog = require("../models/CheckLog");
const Pass = require("../models/Pass");

// Check-In
exports.checkIn = async (
  req,
  res
) => {
  try {
    const { passId } = req.body;

    const pass =
      await Pass.findById(passId);

    if (!pass) {
      return res.status(404).json({
        message: "Pass not found",
      });
    }

    const log =
      await CheckLog.create({
        pass: passId,
        checkInTime: new Date(),
      });

    res.status(201).json({
      success: true,
      log,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Check-Out
exports.checkOut = async (
  req,
  res
) => {
  try {
    const log =
      await CheckLog.findByIdAndUpdate(
        req.params.id,
        {
          checkOutTime:
            new Date(),
          status:
            "CHECKED_OUT",
        },
        {
          new: true,
        }
      );

    if (!log) {
      return res.status(404).json({
        message:
          "Log not found",
      });
    }

    res.status(200).json({
      success: true,
      log,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// Get All Logs
exports.getLogs = async (
  req,
  res
) => {
  try {
    const logs =
      await CheckLog.find()
        .populate({
          path: "pass",
          populate: {
            path: "visitor",
          },
        });

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};
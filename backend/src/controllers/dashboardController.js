const Visitor = require("../models/Visitor");
const Appointment = require("../models/Appointment");
const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");

exports.getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalVisitors =
      await Visitor.countDocuments();

    const totalAppointments =
      await Appointment.countDocuments();

    const totalPasses =
      await Pass.countDocuments();

    const totalCheckIns =
      await CheckLog.countDocuments({
        status: "CHECKED_IN",
      });

    const totalCheckOuts =
      await CheckLog.countDocuments({
        status: "CHECKED_OUT",
      });

    res.status(200).json({
      success: true,

      stats: {
        totalVisitors,
        totalAppointments,
        totalPasses,
        totalCheckIns,
        totalCheckOuts,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
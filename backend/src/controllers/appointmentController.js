const Appointment = require("../models/Appointment");

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment =
      await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Appointments
exports.getAppointments = async (
  req,
  res
) => {
  try {
    const appointments =
      await Appointment.find()
        .populate("visitor")
        .populate("host");

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Appointment
exports.getAppointmentById = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.findById(
        req.params.id
      )
        .populate("visitor")
        .populate("host");

    if (!appointment) {
      return res.status(404).json({
        message:
          "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Approve Appointment
exports.approveAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          {
            status: "APPROVED",
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Reject Appointment
exports.rejectAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          {
            status: "REJECTED",
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  approveAppointment,
  rejectAppointment,
} = require(
  "../controllers/appointmentController"
);

router.post(
  "/",
  createAppointment
);

router.get(
  "/",
  getAppointments
);

router.get(
  "/:id",
  getAppointmentById
);

router.put(
  "/approve/:id",
  approveAppointment
);

router.put(
  "/reject/:id",
  rejectAppointment
);

module.exports = router;
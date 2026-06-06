const express = require("express");

const router = express.Router();

const {
  checkIn,
  checkOut,
  getLogs,
} = require(
  "../controllers/checkLogController"
);

router.post(
  "/checkin",
  checkIn
);

router.put(
  "/checkout/:id",
  checkOut
);

router.get(
  "/",
  getLogs
);

module.exports = router;
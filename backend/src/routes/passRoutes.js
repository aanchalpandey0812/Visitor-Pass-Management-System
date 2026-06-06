const express =
  require("express");

const router =
  express.Router();

const {
  generatePass,
  getPasses,
  getPassById,
} = require(
  "../controllers/passController"
);

router.post(
  "/",
  generatePass
);

router.get(
  "/",
  getPasses
);

router.get(
  "/:id",
  getPassById
);

module.exports = router;
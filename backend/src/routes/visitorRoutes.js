const express = require("express");

const router = express.Router();

const {
  addVisitor,
  getVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitorController");

router.post("/", addVisitor);

router.get("/", getVisitors);

router.get("/:id", getVisitorById);

router.put("/:id", updateVisitor);

router.delete("/:id", deleteVisitor);

module.exports = router;
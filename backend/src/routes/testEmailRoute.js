const express = require("express");

const router =
  express.Router();

const sendEmail = require(
  "../utils/sendEmail"
);

router.get(
  "/send",
  async (req, res) => {
    await sendEmail(
      "yourgmail@gmail.com",
      "Visitor Pass System",
      "Test Email Successful"
    );

    res.json({
      message:
        "Email Sent",
    });
  }
);

module.exports = router;
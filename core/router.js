/** Constants Declaration */
const express = require("express");
const router = express.Router();

// define the home page route
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "QR Code Reader"
  });
});

/** Export Routes */
module.exports = router;

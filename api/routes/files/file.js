const express = require("express");
const router = express();
const path = require("path");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../../../../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res, next) => {
  if (req.file) {
    res.status(200).json({ message: "successful", file: req.file });
  } else {
    res.status(400).json({ message: "failed" });
  }
});

module.exports = router;

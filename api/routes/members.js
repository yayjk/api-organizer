const express = require("express");
const router = express();
const mongoose = require("mongoose");

const Members = require("../models/members");

//get all member ids
router.get("/allIds", (req, res, next) => {
  Members.find({}, { _id: "" })
    .then((memberIdsList) => {
      res.status(200).json({ memberIdsList });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});

//create a member
router.post("/", (req, res, next) => {
  const member = new Members({
    _id: mongoose.Types.ObjectId(),
    team: req.body.team,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    position: req.body.position,
  });

  member
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ result, ok: 1 });
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;

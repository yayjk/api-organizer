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
  if (
    req.body.team &&
    req.body.name &&
    req.body.email &&
    req.body.phone &&
    req.body.position
  ) {
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
  } else {
    res.status(422).json({ message: "invalid input" });
  }
});

module.exports = router;

//get member details by id
router.get("/:memberId", (req, res, next) => {
  const memberId = req.params.memberId;
  Members.findById(memberId)
    .exec()
    .then((memberDetails) => {
      if (memberDetails) {
        const returnObject = memberDetails;
        Members.find({ team: memberDetails.team }, { _id: "" })
          .then((teamMembersId) => {
            res.status(200).json({ memberDetails, teamMembersId });
          })
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(500).json({ error: "No member associated with that id" });
      }
    })
    .catch((error) => res.status(500).json(error));
});

//get member by team
router.get("/:team", (req, res, next) => {
  const team = req.params.memberId;
  Members.find({ team })
    .then((teamMembers) => {
      res.status(200).json({ teamMembers });
    })
    .catch((erro) => res.status(200).json(error));
});

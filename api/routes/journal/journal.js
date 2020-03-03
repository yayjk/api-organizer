const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const JournalEntry = require("../../models/journal");

//get all journal entries (No conditions)
router.get("/all", (req, res, next) => {
  JournalEntry.find()
    .then(journalEntries => {
      console.log(journalEntries);
      res.status(200).json({
        journalEntries
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//get journal entry by id
router.get("/:entryId", (req, res, next) => {
  const id = req.params.entryId;
  JournalEntry.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No entry found for the provided id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//create journal entry in below format
// {
//   "journalEntry": "..."
// }
router.post("/", (req, res, next) => {
  const now = Date.now();
  const journal = new JournalEntry({
    _id: mongoose.Types.ObjectId(),
    journalEntry: req.body.journalEntry,
    dateOfCreation: now,
    dateModified: now,
    archive: false
  });
  journal
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({ result, ok: 1 });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

//update journal entry in below format
// {
//   "journalEntry":"..."
// }
router.patch("/:entryId", (req, res, next) => {
  const id = req.params.entryId;
  JournalEntry.update(
    { _id: id },
    {
      $set: {
        journalEntry: req.body.journalEntry,
        dateModified: Date.now()
      }
    }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

//delete journal entry by id
router.delete("/:entryId", (req, res, next) => {
  const id = req.params.entryId;
  JournalEntry.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

module.exports = router;

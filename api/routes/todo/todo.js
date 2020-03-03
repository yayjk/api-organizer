const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Todo = require("../../models/todo");

//get all todos
router.get("/all", (req, res, next) => {
  Todo.find()
    .then(todoList => {
      res.status(200).json({ todoList });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

//add a todo
router.post("/", (req, res, next) => {
  const item = new Todo({
    _id: mongoose.Types.ObjectId(),
    item: req.body.item,
    isComplete: false
  });
  item
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({ result, ok: 1 });
    })
    .catch(error => res.status(500).json(error));
});

//update a todo
router.patch("/:itemId", (req, res, next) => {
  const id = req.params.itemId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Todo.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch(error => res.status(500).json(error));
});

//Delete a todo
router.delete("/:itemId", (req, res, next) => {
  const id = req.params.itemId;
  Todo.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;

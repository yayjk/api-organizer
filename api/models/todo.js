const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item: String,
  isComplete: Boolean
});

module.exports = mongoose.model("TodoList", todoSchema);

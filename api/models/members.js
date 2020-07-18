const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  team: String,
  name: String,
  email: String,
  phone: Number,
  position: String,
  dateOfJoining: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Members", memberSchema);

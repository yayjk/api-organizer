const mongoose = require("mongoose");

const journalEntrySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  journalEntry: String,
  dateOfCreation: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
  archive: Boolean
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);

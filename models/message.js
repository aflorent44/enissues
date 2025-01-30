const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  auteur: { type: String, required: true },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  etat: { type: String, required: true },
  date_creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);

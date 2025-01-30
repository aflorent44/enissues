const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  auteur: { type: String, required: true },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  etat: {
    type: String,
    enum: ["en-cours", "resolu"], // Liste des valeurs possibles
    default: "en-cours", // Valeur par défaut
  },
  dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);

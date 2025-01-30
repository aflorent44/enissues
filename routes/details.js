const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../models/message");

mongoose.connect("mongodb://localhost:27017/enissuesdb");

// Middleware pour parser les données des formulaires
router.use(express.urlencoded({ extended: true }));

//Route GET pour afficher la page détail des messages
router.get("/messages/details/:id", async (req, res) => {
  try {
    // Avec MongoDB, on utilise findById directement
    const message = await Message.findById(req.params.id);
    // Vérification si le message existe
    if (!message) {
      return res.status(404).send("Message non trouvé");
    }
    // Rendu de la page avec le message
    res.render("details", { message });

  } catch (error) {
    console.error("Erreur lors de la récupération du message :", error);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
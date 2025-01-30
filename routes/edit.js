const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../models/message");

mongoose.connect("mongodb://localhost:27017/enissuesdb");

// Middleware pour parser les données des formulaires
router.use(express.urlencoded({ extended: true }));

// Route GET pour afficher le formulaire de modif
router.get("/messages/edit/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send("Message non trouvé"); //si msg non trouvé renvoi une 404
    }
    res.render("edit", { message });
  } catch (error) {
    console.error("Erreur lors de la récupération du message :", error);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour modifier un message par son ID
router.post("/messages/edit/:id", async (req, res) => {
  try {
    const { auteur, titre, description, etat } = req.body;
    // update msg
    const updateMsg = await Message.findByIdAndUpdate(
      req.params.id,
      {
        auteur,
        titre,
        description,
        etat,
      },
      { new: true } //retourne le document mis à jour
    );
    if (!updateMsg) {
      return res.status(404).send("Message non trouvé");
    }
    res.redirect("/");
  } catch (error) {
    console.error("Erreur lors de la modification du message :", error);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;

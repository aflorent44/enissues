const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//import du modèle mongodb
const Message = require("../models/message");
//lien avec mongodb
mongoose.connect("mongodb://localhost:27017/enissuesdb");

// Middleware pour parser les données des formulaires
router.use(express.urlencoded({ extended: true }));

// Route GET qui affiche la page index avec les messages
router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.render("index", { messages });
});

// Route POST qui gère la création des nouveaux messages
router.post("/messages/create", async (req, res) => {
  try {
    const { auteur, titre, description, etat } = req.body;
    const newMsg = new Message({
      auteur,
      titre,
      description,
      etat,
      dateCreation: new Date(), // On envoie directement l'objet Date
    });
    await newMsg.save();
    res.redirect("/");
  } catch (error) {
    console.error("Erreur lors de la création du message:", error);
    res.redirect("/?error=true");
  }
});

// Route pour supprimer un message par son ID
router.post("/messages/delete/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;

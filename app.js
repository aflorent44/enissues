const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.set("views", "./views");
app.set("view engine", "ejs");
const Message = require("./models/message");
require("dotenv").config();
mongoose.connect(process.env.DBURL);
app.use(express.urlencoded({ extended: true }));

// Route GET qui affiche la page index avec les messages
app.get("/", async (req, res) => {
  const messages = await Message.find();
  res.render("index", { messages });
});

// Formulaire de création
app.get("/create", (req, res) => {
  res.render("create");
});

// Route POST qui gère la création des nouveaux messages
app.post("/messages/create", async (req, res) => {
  const newMessage = new Message(req.body);
  await newMessage.save();
  res.redirect("/");
});


// Route GET pour afficher le formulaire de modif
app.get("/messages/edit/:id", async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    return res.status(404).send("Message non trouvé"); //si msg non trouvé renvoi une 404
  }
  res.render("edit", { message });
});

// Route pour modifier un message par son ID
app.post("/messages/edit/:id", async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

// Route pour supprimer un message par son ID
app.post("/messages/delete/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});

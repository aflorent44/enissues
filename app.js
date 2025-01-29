const express = require("express");

const app = express();
const port = 3000;
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let messages = [];
let nextId = 1; //initialisation de nextId qui génère des id uniques

// Route GET qui affiche la page index avec les messages
app.get("/", (req, res) => {
  res.render("index", { messages });
});

// Route POST qui gère la création des nouveaux messages
app.post("/messages/create", (req, res) => {
  const { auteur, titre, description, etat } = req.body;
  const dateCreation = new Date().toLocaleString("fr-FR");
  messages.push({
    id: nextId++, //ajoute ID unique par msg
    auteur,
    dateCreation,
    titre,
    description,
    etat,
  });
  res.redirect("/");
});

// Route pour supprimer un message par son ID
app.post("/messages/delete/:id", (req, res) => {
  const messageId = Number(req.params.id); // Utilisation de Number() plutôt que parseInt
  if (!isNaN(messageId)) {
    messages = messages.filter((message) => message.id !== messageId);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});

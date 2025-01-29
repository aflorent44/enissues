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
  const messageId = Number(req.params.id); //récupère l'id depuis l'url et check que c'est bien un nombre
  if (!isNaN(messageId)) {
    messages = messages.filter((message) => message.id !== messageId);
  }
  res.redirect("/");
});

// Route GET pour afficher le formulaire de modif
app.get("/messages/edit/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const message = messages.find((msg) => msg.id === messageId); //cherche le msg avec find()
  if (!message) {
    return res.status(404).send("Message non trouvé"); //si msg non trouvé renvoi une 404
  }
  res.render("edit", { message });
});

// Route pour modifier un message par son ID
app.post("/messages/edit/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const { auteur, titre, description, etat } = req.body;
  const messageIndex = messages.findIndex((msg) => msg.id === messageId);

  if (messageIndex === -1) {
    return res.status(404).send("Message non trouvé");
  }

  messages[messageIndex] = {
    ...messages[messageIndex],
    auteur,
    titre,
    description,
    etat,
  };

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});

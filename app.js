const express = require("express");
const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let messages = [];

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.get("/test-error", (req, res) => {
  throw new Error("Test d'erreur serveur !");
});

app.post("/messages/create", (req, res) => {
  const { auteur, titre, description, etat } = req.body;
  const dateCreation = new Date().toLocaleString("fr-FR");
  if (!auteur || !titre || !description || !etat) {
    return res.status(400).send("Tous les champs sont requis !");
  }
  messages.push({ auteur, dateCreation, titre, description, etat });
  res.redirect("/");
});

// Middleware pour gérer les erreurs serveur (500)
app.use((err, req, res, next) => {
  console.error("Erreur détectée :", err.stack);
  res.status(500).render("error", { messageErr: "Une erreur interne est survenue." });
});

// Middleware pour gérer les routes inexistantes (404)
app.use((req, res, next) => {
  res.status(404).render("error", { messageErr: "Page non trouvée (404)." });
});

app.listen(port, () => {
  console.log("Le serveur tourne sur le port " + port);
});

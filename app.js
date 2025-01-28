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

app.post("/cities/create", (req, res) => {
  const { auteur, titre, description, etat } = req.body;
  const dateCreation = new Date().toLocaleString("fr-FR");
  messages.push({ auteur, dateCreation, titre, description, etat });
  res.redirect("/");
});
app.listen(port, () => {
  console.log("Le serveur tourne sur le port " + port);
});
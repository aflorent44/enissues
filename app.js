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

app.post("/message/create", (req, res) => {
  const { auteur, titre, description, etat } = req.body;
  const date_creation = new Date().toLocaleString();
  messages.push({ auteur, date_creation, titre, description, etat });
  console.log(messages);
  res.redirect("/");
});
app.listen(port, () => {
  console.log("Le serveur tourne sur le port " + port);
});

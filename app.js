const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

//Importer les routes
const indexRoute = require("./routes/index");
const editRoute = require("./routes/edit");
const detailsRoute = require("./routes/details");

//configure le moteur de templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware qui analyse (parse) les données envoyées via un formulaire HTML
//DOIT ÊTRE PLACE AVANT LES ROUTES
app.use(express.urlencoded({ extended: true }));

//middleware pour les routes
app.use("/", indexRoute);
app.use("/", editRoute);
app.use("/", detailsRoute);

app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});

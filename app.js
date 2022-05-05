const express = require("express");

const hbs = require("hbs");

require("dotenv").config();

require('./configs/database.config');

const Movie = require("./model/Movie.model")
const app = express();

// ****************** require body-parsing ******************
// const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
// *********************************************************

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.render("login-form");
});

app.post("/addmovie", (req, res) => {
  const { title, year, director } = req.body;
  console.log("THE BODY: ", { title, year, director });
  console.log(`title: ${title} - year: ${year} - director: ${director}`);
 
  Movie.create({ title, year, director })
  .then(addMovie => res.render("login-form", addMovie)
)})

// Render index page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () =>
  console.log(`Running on port: ${process.env.PORT}`)
);

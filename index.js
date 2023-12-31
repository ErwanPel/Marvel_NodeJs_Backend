require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

const charactersRoute = require("./Routes/characters");
const comicsRoute = require("./Routes/comics");
const userRoutes = require("./Routes/user");
const FavoriteRoutes = require("./Routes/favorites");
const formPortfolioRoutes = require("./Routes/portfolioForm");

app
  .use(express.json())
  .use(cors())
  .use(charactersRoute)
  .use(comicsRoute)
  .use(userRoutes)
  .use(FavoriteRoutes)
  .use(formPortfolioRoutes);

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue au site Marvel" });
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

app.all("*", (req, res) => {
  try {
    res.status(404).json({ message: "Page not found !" });
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server has started");
});

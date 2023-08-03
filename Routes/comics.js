const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    const { title, limit, skip } = req.query;
    let filters = { apiKey: process.env.APIKEY };

    if (title) {
      filters["title"] = title;
    }
    if (limit) {
      filters["limit"] = limit;
    }
    if (skip) {
      filters["skip"] = skip;
    }

    let query = "";
    const keys = Object.keys(filters);
    for (let i = 0; i < keys.length; i++) {
      if (i === 0) {
        query += `?${keys[i]}=${filters[keys[i]]}`;
      } else {
        query += `&${keys[i]}=${filters[keys[i]]}`;
      }
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics${query}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.APIKEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.APIKEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

module.exports = router;

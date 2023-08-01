const express = require("express");
const { getAllAnimes } = require("../controllers/animeController");

const animeRouter = express.Router();

animeRouter.get("/", getAllAnimes);

// animeRouter.post("/", storeUser);
// animeRouter.get("/getMe", getUserByID);
// animeRouter.post("/login", loginByUser);

module.exports = animeRouter;

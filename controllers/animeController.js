const getAnimesMethod = require("../models/animeModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllAnimes = catchAsync(async (req, res, next) => {
  //   const response = await fetch("https://api.jikan.moe/v4/anime");

  //   console.log(req);

  const animes = await getAnimesMethod(req.query);

  res.status(200).json({
    length: animes.length,
    data: animes,
  });
});

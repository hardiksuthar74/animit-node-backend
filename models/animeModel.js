const getAnimesMethod = async (query) => {
  console.log(query);

  let response;

  if (query.q) {
    response = await fetch(`https://api.jikan.moe/v4/anime?q=${query.q}`);
  } else {
    response = await fetch(`https://api.jikan.moe/v4/anime`);
  }

  const data = await response.json();

  const result = data.data.map((anime) => ({
    title: anime.title,
    images: anime.images.webp.large_image_url,
    type: anime.type,
    episodes: anime.episodes,
    status: anime.status,
    score: anime.score,
    popularity: anime.popularity,
    season: anime.season,
    year: anime.year,
    synopsis: anime.synopsis,
  }));

  //   return data.data[0].title;
  return result;
};

module.exports = getAnimesMethod;

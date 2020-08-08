const cardMovieTemplate = (imdbID, title, poster, year, favoriteClass) => {
  // If the movie poster is not available, a default image is added
  const imgPoster = poster === 'N/A' ? './assets/img/not-found.png' : poster;

  const cardTemplate = `
    <a class="card-left" href="#/info?movie=${imdbID}&plot=full">
      <div class="card-image">
        <img src="${imgPoster}" class="card-poster" alt="${title}">
      </div>
      <div class="card-text">
        <button class="btn-favorite ${favoriteClass}" data-id="${imdbID}"></button>
        <h1 class="card-title">${title}</h1>
        <p>${year}</p>
      </div>
    </a>
  `;

  return cardTemplate;
};

export default cardMovieTemplate;

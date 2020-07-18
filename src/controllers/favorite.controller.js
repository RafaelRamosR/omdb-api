import model from '../models/base.model.js';
import favoriteView from '../views/favorite.view.js';

const favorite = async () => {
  const favoriteSection = document.createElement('section');
  // View is added
  favoriteSection.innerHTML = favoriteView;
  const filmSearchSection = favoriteSection.querySelector('.card-container');
  const favoriteMovies = model.getUserData('movies');

  // Empty local storage movie list, return message
  if (favoriteMovies.length === 0) {
    filmSearchSection.innerHTML = '<p class="notResult">You do not have favorite movies 😥</p>';
    return favoriteSection;
  }

  // see all the user's favorite movies
  favoriteMovies.forEach(async (e) => {
    const data = await model.getMovies('i', e);
    filmSearchSection.innerHTML += `
      <div class='card-left'>
        <div class='card-image'>
        <img src='${data.Poster}' class="card-poster">
        </div>
        <div class='card-text'>
          <button class="btn-favorite remove-favorite" data-id="${data.imdbID}"></button>
          <h1 class="card-title">
            <a href="#/info?movie=${data.imdbID}&plot=full">${data.Title}</a>
          </h1>
          <p>${data.Year}</p>
        </div>
      </div>
    `;

    // Add favorite buttons to each card
    const btnFavorites = filmSearchSection.querySelectorAll('.btn-favorite');
    btnFavorites.forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        model.favoriteToggle(ev.target.dataset.id);
        // Path to remove card
        const cardMovie = ev.composedPath()[2];
        cardMovie.remove();
      });
    });
  });

  return favoriteSection;
};

export default favorite;

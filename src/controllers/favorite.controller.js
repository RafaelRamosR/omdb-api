import model from '../models/base.model';
import favoriteView from '../views/favorite.view';

export default favorite = async () => {
  const fragment = document.createDocumentFragment();
  const favoriteSection = document.createElement('section');
  favoriteSection.innerHTML = favoriteView;
  const filmSearchSection = favoriteSection.querySelector('.card-container');
  const favoriteMovies = model.getUserData('movies');
  const data = [];

  favoriteMovies.forEach((e) => {
    e.push(model.getMovies('i', movie));
  });

  if (data.length === 0) {
    filmSearchSection.innerHTML = '<p class="notResult">You do not have favorite movies 😥</p>';
    fragment.appendChild(favoriteSection);
    return fragment;
  }

  data.forEach((e) => {
    filmSearchSection.innerHTML += `
      <div class='card-left'>
        <div class='card-image'>
          <img src='${e.Poster}'>
        </div>
        <div class='card-text'>
          <button class="btn-favorite remove-favorite" data-id="${e.imdbID}"></button>
          <h1 class="card-title">
            <a href="#/info?movie=${e.imdbID}&plot=full">${e.Title}</a>
          </h1>
          <p>${e.Year}</p>
        </div>
      </div>
    `;

    // Seleccionar todos los botones de favoritos
    const btnFavorites = filmSearchSection.querySelectorAll('.btn-favorite');
    btnFavorites.forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        model.favoriteToggle(ev.target.dataset.id);
        // Ruta de la tarjeta
        const cardMovie = ev.composedPath()[2];
        cardMovie.remove();
      });
    });
  });

  fragment.appendChild(favoriteSection);
  return fragment;
};

import { model } from '../models/base.model.js';
import { favoriteView } from "../views/favorite.view.js";

const favorite = async () => {
  const fragment = document.createDocumentFragment();
  const favoriteSection = document.createElement('section');
  favoriteSection.innerHTML = favoriteView;
  const filmSearchSection = favoriteSection.querySelector('.card-container');
  const favoriteMovies = model.getUserData('movies');
  const data = [];

  for (const movie of favoriteMovies) {
    data.push(await model.getMovies('i', movie));
  }

  if (data.length === 0) {
    filmSearchSection.innerHTML = '<p class="notResult">No tienes películas favoritas 😥</p>';
    fragment.appendChild(favoriteSection);
    return fragment;
  }

  data.forEach(e => {
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
    for (const btn of btnFavorites) {
      btn.addEventListener('click', (e) => {
        model.favoriteToggle(e.target.dataset.id);
        // Ruta de la tarjeta
        const cardMovie = e.composedPath()[2];
        cardMovie.remove();
      });
    }
  });

  fragment.appendChild(favoriteSection);
  return fragment;
};

export { favorite };
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

  data.forEach(data => {
    filmSearchSection.innerHTML += `
      <div class='card-left'>
        <div class='card-image'>
          <img src='${data.Poster}'>
        </div>
        <div class='card-text'>
          <button class="btn-favorite remove-favorite" data-id="${data.imdbID}"></button>
          <h1 class="card-title">${data.Title}</h1>
          <p>${data.Year}</p>
        </div>
      </div>
    `;

    // Seleccionar todos los botones de favoritos
    const btnFavorites = filmSearchSection.querySelectorAll('.btn-favorite');
    for (const btn of btnFavorites) {
      btn.addEventListener('click', (e) => {
        e.target.classList.toggle('add-favorite');
        e.target.classList.toggle('remove-favorite');
        model.favoriteToggle(e.target.dataset.id);
      });
    }
  });

  fragment.appendChild(favoriteSection);
  return fragment;
};

export { favorite };
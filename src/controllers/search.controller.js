import { model } from '../models/base.model.js';
import { searchView } from '../views/search.view.js';

const posts = async () => {
  const fragment = document.createDocumentFragment();
  const sectionResult = document.createElement('section');

  // se le añade la vista de búsqueda
  sectionResult.innerHTML = searchView;
  // formulario de búsqueda
  const formSearch = sectionResult.querySelector('.formSearch');

  formSearch.addEventListener('submit', async (e) => {
    const et = e.target;
    e.preventDefault();
    // Limpiar cadena de búsqueda y unir los espacios
    let nameFilm = et.searchFilms.value.trim();
    nameFilm = nameFilm.split(' ').join('+');

    // Section donde se muentran las peliculas buscadas
    const filmSearchSection = sectionResult.querySelector('.card-container');
    filmSearchSection.innerHTML = '';

    // Hacer la petición de la búqueda
    const data = await model.getMovies('s', nameFilm);
    if (data.Response === 'True') {
      const searchResults = data.Search;
      // console.log(data.totalResults);

      // Inssertar las tarjetas donse se muestran las películas
      searchResults.forEach((e) => {
        const includeMovie = model.getUserData('movies').includes(e.imdbID);
        const favoriteClass = includeMovie === true ? 'remove-favorite' : 'add-favorite';

        if (e.Poster === 'N/A') {
          e.Poster = './assets/img/not-found.png';
        }

        filmSearchSection.innerHTML += `
          <div class='card-left'>
            <div class='card-image'>
              <img src='${e.Poster}'>
            </div>
            <div class='card-text'>
              <button class="btn-favorite ${favoriteClass}" data-id="${e.imdbID}"></button>
              <h1 class="card-title">${e.Title}</h1>
              <p>${e.Year}</p>
            </div>
          </div>
        `;
      });

      // Seleccionar todos los botones de favoritos
      const btnFavorites = sectionResult.querySelectorAll('.btn-favorite');
      btnFavorites.forEach((btnFavorite) => {
        btnFavorite.addEventListener('click', (e) => {
          e.target.classList.toggle('add-favorite');
          e.target.classList.toggle('remove-favorite');
          model.favoriteToggle(e.target.dataset.id);
        });
      });
    } else {
      filmSearchSection.innerHTML = '<p class="notResult">No se encontraron resultados 🧐</p>';
    }
  });

  fragment.appendChild(sectionResult);
  return fragment;
};

export { posts };
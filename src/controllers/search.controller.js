import { model } from '../models/base.model.js';
import { searchView } from '../views/search.view.js';

const searchMovie = async () => {
  const sectionResult = document.createElement('section');

  // se le añade la vista de búsqueda
  sectionResult.innerHTML = searchView;
  // formulario de búsqueda
  const formSearch = sectionResult.querySelector('.formSearch');

  formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Limpiar cadena de búsqueda y unir los espacios
    const et = e.target;
    let nameFilm = et.searchFilms.value.trim();
    nameFilm = nameFilm.split(' ').join('+');
    // Section donde se muentran las peliculas buscadas
    const filmSearchSection = sectionResult.querySelector('.card-container');
    const paginationSection = sectionResult.querySelector('.pagination');
    filmSearchSection.innerHTML = '';
    paginationSection.innerHTML = '';

    // Hacer la petición de la búqueda
    const data = await model.getMovies('s', nameFilm);
    if (data.Response === 'False') {
      filmSearchSection.innerHTML = '<p class="notResult">No se encontraron resultados 🧐</p>';
      return sectionResult;
    }

    const searchResults = data.Search;
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
    for (const btn of btnFavorites) {
      btn.addEventListener('click', (e) => {
        e.target.classList.toggle('add-favorite');
        e.target.classList.toggle('remove-favorite');
        model.favoriteToggle(e.target.dataset.id);
      });
    }

    const totalResults = data.totalResults;
    const totalPages = totalResults > 100 ? 10 : Math.floor(totalResults / 10);
    // Inssertar las tarjetas donse se muestran las películas
    for (let i = 1; i <= totalPages; i++) {
      paginationSection.innerHTML += `
        <span class="pageNum">${i}</span>
      `;
    }
  });

  return sectionResult;
};

export { searchMovie };
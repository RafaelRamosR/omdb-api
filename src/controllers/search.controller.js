import model from '../models/base.model';
import searchView from '../views/search.view';

const sectionResult = document.createElement('section');
sectionResult.innerHTML = searchView;

export default home = async (movie, page) => {
  const filmSearchSection = sectionResult.querySelector('.card-container');
  const paginationSection = sectionResult.querySelector('.pagination');
  filmSearchSection.innerHTML = '';
  paginationSection.innerHTML = '';

  if (movie === undefined && page === undefined) {
    return sectionResult;
  }

  // Hacer la petición de la búqueda
  const data = await model.getMovies('s', movie, page);
  if (data.Response === 'False') {
    filmSearchSection.innerHTML = '<p class="notResult">No results found 🧐</p>';
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
          <img src='${e.Poster}' class="card-poster" alt="${e.Title}">
        </div>
        <div class='card-text'>
          <button class="btn-favorite ${favoriteClass}" data-id="${e.imdbID}"></button>
          <h1 class="card-title">
            <a href="#/info?movie=${e.imdbID}&plot=full">${e.Title}</a>
          </h1>
          <p>${e.Year}</p>
        </div>
      </div>
    `;
  });

  // Seleccionar todos los botones de favoritos
  const btnFavorites = sectionResult.querySelectorAll('.btn-favorite');
  btnFavorites.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target.classList.toggle('add-favorite');
      e.target.classList.toggle('remove-favorite');
      model.favoriteToggle(e.target.dataset.id);
    });
  });

  const totalResults = [data.totalResults];
  const totalPages = totalResults[0] > 100 ? 10 : Math.floor(totalResults[0] / 10);
  // Inssertar las tarjetas donse se muestran las películas
  for (let i = 0; i <= totalPages; i += 1) {
    const pageClass = i === parseInt(page, 10) ? 'page-active' : 'page-num';
    paginationSection.innerHTML += `
      <span class="${pageClass}">
        <a href="#/home?movie=${movie}&page=${i}">${i}</a>
      </span>
    `;
  }

  return sectionResult;
};

const formSearch = sectionResult.querySelector('.formSearch');
formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  const et = e.target;
  let nameFilm = et.searchFilms.value.trim();
  nameFilm = nameFilm.split(' ').join('+');
  formSearch.reset();
  return location.replace(`#/home?movie=${nameFilm}&page=1`);
});

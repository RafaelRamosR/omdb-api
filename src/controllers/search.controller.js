import model from '../models/base.model.js';
import searchView from '../views/search.view.js';

const sectionResult = document.createElement('section');
// View is added
sectionResult.innerHTML = searchView;

const home = async (movie, page) => {
  const filmSearchSection = sectionResult.querySelector('.card-container');
  const paginationSection = sectionResult.querySelector('.pagination');
  filmSearchSection.innerHTML = '';
  paginationSection.innerHTML = '';

  // If the search parameters are not defined, the main view is displayed.
  if (movie === undefined && page === undefined) {
    return sectionResult;
  }

  // Request API
  const data = await model.getMovies('s', movie, page);
  // If the answer is false, the movie does not exist
  if (data.Response === 'False') {
    filmSearchSection.innerHTML = '<p class="notResult">No results found 🧐</p>';
    return sectionResult;
  }

  // API response
  const searchResults = data.Search;
  searchResults.forEach((e) => {
    const includeMovie = model.getUserData('movies').includes(e.imdbID);
    const favoriteClass = includeMovie === true ? 'remove-favorite' : 'add-favorite';
    // If the movie poster is not available, a default image is added
    if (e.Poster === 'N/A') {
      e.Poster = './assets/img/not-found.png';
    }

    // Insert movie cards
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

  // Add buttons to add or remove from favorites
  const btnFavorites = sectionResult.querySelectorAll('.btn-favorite');
  btnFavorites.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target.classList.toggle('add-favorite');
      e.target.classList.toggle('remove-favorite');
      model.favoriteToggle(e.target.dataset.id);
    });
  });

  // Only the first 100 results will be shown
  const totalPages = data.totalResults > 100 ? 10 : Math.floor(data.totalResults / 10);
  // Add paging buttons
  for (let i = 1; i <= totalPages; i += 1) {
    const pageClass = i === parseInt(page, 10) ? 'page-active' : 'page-num';
    paginationSection.innerHTML += `
      <span class="${pageClass}">
        <a href="#/home?movie=${movie}&page=${i}">${i}</a>
      </span>
    `;
  }

  return sectionResult;
};

// A slug is created to redirect to a new search
const formSearch = sectionResult.querySelector('.formSearch');
formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  const et = e.target;
  let nameFilm = et.searchFilms.value.trim();
  nameFilm = nameFilm.split(' ').join('+');
  formSearch.reset();
  return location.replace(`#/home?movie=${nameFilm}&page=1`);
});

export default home;

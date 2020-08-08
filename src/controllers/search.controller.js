import model from '../models/base.model.js';
import searchView from '../views/search.view.js';
import cardMovieTemplate from '../helpers/card.helper.js';

const sectionResult = document.createElement('section');
// View is added
sectionResult.innerHTML = searchView;
const filmSearchSection = sectionResult.querySelector('.card-container');
const paginationSection = sectionResult.querySelector('.pagination');

const home = async (movie, page) => {
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

    // Insert movie cards
    filmSearchSection.innerHTML += cardMovieTemplate(
      e.imdbID, e.Title, e.Poster, e.Year, favoriteClass,
    );
  });

  // Only the first 100 results will be shown
  const totalPages = data.totalResults > 100 ? 10 : Math.floor(data.totalResults / 10);
  // Add paging buttons
  for (let i = 1; i <= totalPages; i += 1) {
    const pageClass = i === parseInt(page, 10) ? 'page-active' : 'page-num';
    paginationSection.innerHTML += `
      <a href="#/home?movie=${movie}&page=${i}">
        <span class="${pageClass}">${i}</span>
      </a>
    `;
  }

  return sectionResult;
};

// Add buttons to add or remove from favorites
filmSearchSection.addEventListener('click', (e) => {
  const btnFavorite = e.target.dataset.id;
  if (btnFavorite !== undefined) {
    e.preventDefault();
    e.target.classList.toggle('add-favorite');
    e.target.classList.toggle('remove-favorite');
    // remove from favorites list
    model.favoriteToggle(e.target.dataset.id);
  }
});

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

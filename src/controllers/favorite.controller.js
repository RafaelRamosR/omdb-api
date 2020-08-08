import model from '../models/base.model.js';
import favoriteView from '../views/favorite.view.js';
import cardMovieTemplate from '../helpers/card.helper.js';

const favoriteSection = document.createElement('section');
// View is added
favoriteSection.innerHTML = favoriteView;
const favoriteContainer = favoriteSection.querySelector('.favorite-container');

const favorite = async () => {
  const favoriteMovies = model.getUserData('movies');

  // Empty local storage movie list, return message
  if (favoriteMovies.length === 0) {
    favoriteContainer.innerHTML = '<p class="notResult">You do not have favorite movies 😥</p>';
    return favoriteSection;
  }

  // see all the user's favorite movies
  favoriteMovies.forEach(async (movie) => {
    const data = await model.getMovies('i', movie);

    favoriteContainer.innerHTML += cardMovieTemplate(
      data.imdbID, data.Title, data.Poster, data.Year, 'remove-favorite',
    );
  });

  return favoriteSection;
};

// Detect when the favorite button is clicked
favoriteContainer.addEventListener('click', (e) => {
  const btnFavorite = e.target.dataset.id;
  if (btnFavorite !== undefined) {
    e.preventDefault();
    // Remove from favorites list
    model.favoriteToggle(e.target.dataset.id);
    // Path to remove card
    const cardMovie = e.composedPath()[2];
    cardMovie.remove();
  }
});

export default favorite;

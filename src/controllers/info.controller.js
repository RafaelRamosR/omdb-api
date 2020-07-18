import infoView from '../views/info.view.js';
import model from '../models/base.model.js';

const infoMovie = async (movie, page) => {
  const infoSection = document.createElement('section');
  infoSection.classList.add('main-movie');
  // View is added
  infoSection.innerHTML = infoView;
  const movieCard = infoSection.querySelector('.movie-card');

  // Make the selected movie request
  const data = await model.getMovies('i', movie, page);
  // If the answer is wrong, show error message
  if (data.Response === 'False') {
    infoSection.innerHTML = '<p class="notResult">No se encontraron resultados 🧐</p>';
    return infoSection;
  }

  // If the answer is OK, show the movie information
  movieCard.innerHTML += `
    <div class="poster-float">
      <img src="${data.Poster}" class="poster-img" alt="${data.Title}">
    </div>
    <div class="details-card">
      <h1 class="title movie-title">${data.Title}</h1>
      <div class="details">
        <ul class="details-items">
          <li><span class="bold">Year:</span> ${data.Year}</li>
          <li><span class="bold">Rated:</span> ${data.Rated}</li>
          <li><span class="bold">Released:</span> ${data.Released}</li>
          <li><span class="bold">Runtime:</span> ${data.Runtime}</li>
          <li><span class="bold">Genre:</span> ${data.Genre}</li>
          <li><span class="bold">Director:</span> ${data.Director}</li>
          <li><span class="bold">Writer:</span> ${data.Writer}</li>
          <li><span class="bold">Actors:</span> ${data.Actors}</li>
        </ul>
      </div>
    </div>
    <div class="storyline">
      <h2 class="title">Storyline</h2>
      <p>${data.Plot}</p>
    </div>
  `;

  return infoSection;
};

export default infoMovie;

import infoView from '../views/info.view';
import model from '../models/base.model';

export default infoMovie = async (movie, page) => {
  const infoSection = document.createElement('section');
  infoSection.classList.add('main-movie');
  infoSection.innerHTML = infoView;
  const movieCard = infoSection.querySelector('.movie-card');

  // Hacer la petición de la búqueda
  const data = await model.getMovies('i', movie, page);
  if (data.Response === 'False') {
    infoSection.innerHTML = '<p class="notResult">No se encontraron resultados 🧐</p>';
    return infoSection;
  }

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

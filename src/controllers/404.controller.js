import viewNotFound from '../views/404.view.js';

// View whenever there is no view
const notFound = () => {
  const content404 = document.createElement('section');
  content404.classList.add('error');
  content404.innerHTML = viewNotFound;
  return content404;
};

export default notFound;

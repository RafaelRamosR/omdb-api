import viewNotFound from '../views/404.view';

export default notFound = () => {
  const content404 = document.createElement('section');
  content404.classList.add('error');
  content404.innerHTML = viewNotFound;
  return content404;
};

import pages from '../controllers/index';

const routeValidation = (route) => {
  const loginStatus = sessionStorage.getItem('loginStatus');
  let valueRoute = route;
  if (loginStatus === null) {
    sessionStorage.setItem('loginStatus', 'false');
  }

  if (loginStatus === 'false') {
    location.replace('#/login');
    valueRoute = '#/login';
  }

  if (loginStatus === 'true' && route === '#/login') {
    location.replace('#/home');
    valueRoute = '#/home';
  }
  return valueRoute;
};

const routeParameters = (route) => {
  const parameters = [route];

  if (route.startsWith('#/home?') || route.startsWith('#/info?')) {
    const clearRoute = route.split(/[?||&]/);
    parameters[0] = [clearRoute[0]];
    parameters[1] = [clearRoute[1].split('=')[1]];
    parameters[2] = [clearRoute[2].split('=')[1]];
  }
  return parameters;
};

export default router = async (route) => {
  let newRoute = route;
  const fragment = document.createDocumentFragment();
  const content = document.getElementById('root');
  content.innerHTML = '';

  const parameters = routeParameters(route);
  newRoute = [parameters[0]];
  const movie = parameters[1];
  const page = parameters[2];

  newRoute = routeValidation(route);

  switch (newRoute) {
    case '#/login': {
      fragment.appendChild(pages.login());
      break;
    }
    case '#/home': {
      fragment.appendChild(await pages.home(movie, page));
      break;
    }
    case '#/favorite': {
      fragment.appendChild(await pages.favorite());
      break;
    }
    case '#/info': {
      fragment.appendChild(await pages.infoMovie(movie, page));
      break;
    }
    case '#/logout': {
      return pages.logout();
    }
    default: {
      fragment.appendChild(pages.notFound());
    }
  }

  return content.appendChild(fragment);
};

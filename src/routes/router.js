import helpRouter from '../helpers/router.helper.js';
import pages from '../controllers/index.js';

const router = async (route) => {
  const fragment = document.createDocumentFragment();
  // Main container where the SPA will be loaded
  const content = document.getElementById('root');
  content.innerHTML = '';

  // Extract link parameters, if they exist
  const parameters = helpRouter.routeParameters(route);
  // Determine a route based on user session
  const newRoute = helpRouter.routeValidation(parameters[0]);

  // Add view based on route
  switch (newRoute) {
    case '#/login': {
      fragment.appendChild(pages.login());
      break;
    }
    case '#/home': {
      fragment.appendChild(await pages.home(parameters[1], parameters[2]));
      break;
    }
    case '#/favorite': {
      fragment.appendChild(await pages.favorite());
      break;
    }
    case '#/info': {
      fragment.appendChild(await pages.infoMovie(parameters[1], parameters[2]));
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

export default router;

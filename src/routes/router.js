import { pages } from '../controllers/index.js';

const routeValidation = (route) => {
  const loginStatus = sessionStorage.getItem('loginStatus');
  if(loginStatus === null){
    sessionStorage.setItem('loginStatus', 'false');
  }
  
  if(loginStatus === 'false'){
    location.replace('#/login');
  }

  if(loginStatus === 'true' && route === '#/login'){
    location.replace('#/home');
  }
}

const router = async (route) => {
  const fragment = document.createDocumentFragment();
  let content = document.getElementById("root");
  content.innerHTML = '';

  routeValidation(route);

  switch (route) {
    case "#/login": {
      fragment.appendChild(pages.login());
      break;
    }
    case "#/home": {
      fragment.appendChild(await pages.posts());
      break;
    }
    case "#/favorite": {
      fragment.appendChild(await pages.favorite());
      break;
    }
    case "#/logout": {
     return pages.logout();
    }
    default: {
      fragment.appendChild(await pages.notFound());
    }
  }

  return content.appendChild(fragment);
};

export { router };
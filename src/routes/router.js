import { pages } from '../controllers/index.js';

const router = (route) => {
  let content = document.getElementById("root");
  content.innerHTML = "";

  const loginStatus = sessionStorage.getItem('loginStatus')
  if(loginStatus === null){
    sessionStorage.setItem('loginStatus', 'false');
  }

  if(loginStatus === 'false' && route !== '#/login'){
    return content.appendChild(pages.loginReturn());
  }

  switch (route) {
    case "#/login": {
      return content.appendChild(pages.login());
    }
    case "#/home": {
      return content.appendChild(pages.posts());
    }
    case "#/favorite": {
      return content.appendChild(pages.favorite());
    }
    case "#/sing-out": {
      return content.appendChild(pages.singout());
    }
    default: {
      return content.appendChild(pages.notFound());
    }
  }

};

export { router };

// module.exports = router;

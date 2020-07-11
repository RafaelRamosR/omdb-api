// import { router } from "./router/routes";
// const router = require('./router/routes');
// const Request_404 = require('./views/404');

const pages = (contentView) => {
  const divElement = document.createElement('div');
  divElement.innerHTML = contentView;

  return divElement;
}

const router = (route) => {
  let content = document.getElementById("root");
  content.innerHTML = "";

  switch (route) {
    case "#/": {
      return content.appendChild(pages(login));
    }
    case "#/post": {
      return content.appendChild(pages(request_404));
    }
    default: {
      return console.log('INICIO');// content.appendChild(pages());
    }
  }

};

const init = () => {
  router(window.location.hash);

  window.addEventListener("hashchange", () => {
    router(window.location.hash);
  });
};

window.addEventListener("load", init);

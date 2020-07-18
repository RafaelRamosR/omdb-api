import router from './routes/router.js';

// Capture the hash that determines the route and view
const init = () => {
  router(window.location.hash);

  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
};

window.addEventListener('load', init);

// Responsive navbar functions
const classToggle = () => {
  const navs = document.querySelectorAll('.nav-items');
  navs.forEach((nav) => nav.classList.toggle('nav-toggleShow'));
};

const btnNav = document.querySelector('.nav-link-toggle');
btnNav.addEventListener('click', classToggle);

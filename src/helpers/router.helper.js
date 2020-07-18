// Redirect the user depending on the user session
const routeRedirection = (route) => {
  const loginStatus = sessionStorage.getItem('loginStatus');
  let valueRoute = route;

  // If there is no user session, it is created
  if (loginStatus === null) {
    sessionStorage.setItem('loginStatus', 'false');
  }

  // If the session is false or the path is blank, the login is displayed
  if (loginStatus === 'false' || route === '') {
    location.replace('#/login');
    valueRoute = '#/login';
  }

  // If you are already logged in, you cannot return to login
  if (loginStatus === 'true' && route === '#/login') {
    location.replace('#/home');
    valueRoute = '#/home';
  }
  return valueRoute;
};

// Get the parameters as if they were sent by GET
const routeParameters = (route) => {
  const parameters = [route];

  // Only HOME and INFO send search parameters
  if (route.startsWith('#/home?') || route.startsWith('#/info?')) {
    // The link is divided into three parts
    const clearRoute = route.split(/[?||&]/);
    parameters.length = 0;
    // 1. Route
    parameters.push(clearRoute[0]);
    // 2. Movie
    parameters.push(clearRoute[1].split('=')[1]);
    // 3. Page or Plot
    parameters.push(clearRoute[2].split('=')[1]);
  }
  return parameters;
};

const helpRouter = {
  routeParameters,
  routeRedirection,
};

export default helpRouter;

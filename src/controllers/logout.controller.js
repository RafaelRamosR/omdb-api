import navbarItemsToggle from '../helpers/navbar.helper.js';

// Actions to log out
const logout = () => {
  // Hide menu options for logged in users
  navbarItemsToggle(false);
  // Clean user session and return to login
  sessionStorage.clear();
  location.replace('#/login');
};

export default logout;

import { navbarItemsToggle } from '../helpers/navbar.helper.js';

const logout = () => {
  navbarItemsToggle(false);
  sessionStorage.clear();
  location.replace('#/login');
};

export { logout };
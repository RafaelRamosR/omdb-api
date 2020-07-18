import navbarItemsToggle from '../helpers/navbar.helper';

export default logout = () => {
  navbarItemsToggle(false);
  sessionStorage.clear();
  location.replace('#/login');
};

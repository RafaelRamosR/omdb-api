import model from '../models/base.model';
import navbarItemsToggle from '../helpers/navbar.helper';
import userVerification from '../helpers/login.helper';
import viewLogin from '../views/login.view';

export default login = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = viewLogin;

  const formLogin = divElement.querySelector('.form-main');
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const et = e.target;
    const picture = et.avatar.value;
    const username = et.username.value;
    const password = et.password.value;
    const key = btoa(username + password);

    // Create object containing the data to store
    const userObject = userVerification(key, picture, username, password);
    // Save task
    model.setStorage(key, userObject);
    sessionStorage.setItem('loginStatus', 'true');
    sessionStorage.setItem('userId', key);
    navbarItemsToggle(true);
    location.replace('#/home');
  });

  return divElement;
};

import model from '../models/base.model.js';
import navbarItemsToggle from '../helpers/navbar.helper.js';
import userVerification from '../helpers/login.helper.js';
import viewLogin from '../views/login.view.js';

const login = () => {
  const loginContent = document.createElement('div');
  // View is added
  loginContent.innerHTML = viewLogin;
  // Login form
  const formLogin = loginContent.querySelector('.form-main');
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
    // Change session state and create user id
    sessionStorage.setItem('loginStatus', 'true');
    sessionStorage.setItem('userId', key);
    // Show menu options for logged in users
    navbarItemsToggle(true);
    location.replace('#/home');
  });

  return loginContent;
};

export default login;

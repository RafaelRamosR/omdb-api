import { model } from '../models/base.model.js';
import { viewLogin } from '../views/login.view.js'

const userVerification = (key, picture, username, password) => {
  const localData = model.getStorage(key);
  let userData = {};

  if (localData !== null) {
    userData = localData;
    return userData;
  }

  userData = {
    id: key,
    photo: picture,
    name: username,
    pass: password,
    favoriteMovies: [],
  }
  return userData;
}

const login = () => {
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
    location.replace('#/home');
  });

  return divElement;
};

export { login };
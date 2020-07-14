import { model } from '../models/base.model.js';
import {viewLogin} from '../views/login.view.js'

const login = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = viewLogin;

  const formLogin = divElement.querySelector('#formLogin');
  
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const et = e.target;
    const picture = et.avatar.value;
    const username = et.username.value;
    const password = et.password.value;
    // generate supremely secure ID xd
    const key = btoa(username + password);

    // Create object containing the data to store
    const userObject = {
      id: key,
      photo: picture,
      name: username,
      pass: password,
      favoriteMovies: [],
    };
    // Save task
    model.setStorage(key, userObject);
    sessionStorage.setItem('loginStatus', 'true');
    sessionStorage.setItem('userId', key);
    formLogin.reset();
  });

  return divElement;
};

export { login };
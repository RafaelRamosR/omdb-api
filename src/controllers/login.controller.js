import { model } from '../models/base.model.js';
import {viewLogin} from '../views/login.js'

const login = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = viewLogin;

  const formLogin = divElement.querySelector('#formLogin');
  
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const et = e.target;
    const username = et.username.value;
    const password = et.password.value;
    // generate supremely secure ID xd
    const key = btoa(username + password);

    // Create object containing the data to store
    const userObject = {
      id: key,
      name: username,
      pass: password,
    };
    // Save task
    model.setStorage(key, JSON.stringify(userObject));
    sessionStorage.setItem('loginStatus', 'true');
    formLogin.reset();
  });

  return divElement;
};

export { login };
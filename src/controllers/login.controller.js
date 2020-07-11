import {viewLogin} from '../views/login.js'

const Login = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = viewLogin;

  const formLogin = divElement.querySelector('#formLogin');
  
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target.username.value)
    console.log(e.target.password.value)
  });

  return divElement;
};

export { Login };
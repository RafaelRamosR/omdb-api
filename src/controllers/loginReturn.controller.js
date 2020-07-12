import { loginReturnView } from "../views/loginreturn.js";

const loginReturn = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = loginReturnView;

  return divElement;
};

export { loginReturn };
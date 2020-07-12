import { singOutView } from "../views/singout.js";

const singOut = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = singOutView;

  return divElement;
};

export { singOut };
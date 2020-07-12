import { favoriteView } from "../views/favorite.js";

const favorite = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = favoriteView;

  return divElement;
};

export { favorite };
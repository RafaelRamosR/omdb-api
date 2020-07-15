import { viewNotFound } from "../views/404.view.js";

const notFound = () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = viewNotFound;
  return divElement;
};

export { notFound };
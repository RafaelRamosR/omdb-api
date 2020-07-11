import { viewNotFound } from "../views/404.js";

const notFound = () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = viewNotFound;
  return divElement;
};

export { notFound };
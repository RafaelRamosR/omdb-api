import { login } from "./login.controller.js";
import { searchMovie } from "./search.controller.js";
import { favorite } from "./favorite.controller.js";
import { logout } from "./logout.controller.js";
import { infoMovie } from "./info.controller.js";
import { notFound } from "./404.controller.js";

const pages = {
  login,
  searchMovie,
  favorite,
  logout,
  infoMovie,
  notFound,
};

export { pages };
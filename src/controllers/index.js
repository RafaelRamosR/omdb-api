import { login } from "./login.controller.js";
import { posts } from "./search.controller.js";
import { notFound } from "./404.controller.js";
import { favorite } from "./favorite.controller.js";
import { logout } from "./logout.controller.js";

const pages = {
  login,
  posts,
  notFound,
  favorite,
  logout,
};

export { pages };
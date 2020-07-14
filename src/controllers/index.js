import { login } from "./login.controller.js";
import { posts } from "./search.controller.js";
import { notFound } from "./404.controller.js";
import { favorite } from "./favorite.controller.js";
import { singOut } from "./singout.controller.js";
import { loginReturn } from "./loginReturn.controller.js";

const pages = {
  login: login,
  posts: posts,
  notFound: notFound,
  favorite: favorite,
  singout: singOut,
  loginReturn: loginReturn,
};

export { pages };
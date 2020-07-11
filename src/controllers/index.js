import { Login } from "./login.controller.js";
import { posts } from "./posts.controller.js";
import { notFound } from "./404.controller.js";

const pages = {
  login: Login,
  posts: posts,
  notFound: notFound,
};

export { pages };
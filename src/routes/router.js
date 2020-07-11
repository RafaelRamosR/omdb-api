import { pages } from "../controllers/index.js";

const router = (route) => {
  let content = document.getElementById("root");
  content.innerHTML = "";

  console.log(route);

  switch (route) {
    case "#/login": {
      return content.appendChild(pages.login());
    }
    case "#/posts": {
      return content.appendChild(pages.posts());
    }
    default: {
      return content.appendChild(pages.notFound());
    }
  }

};

export { router };

// module.exports = router;

import { postsView } from '../views/posts.js';

const getPosts = async () => {
  const response = await fetch("http://www.omdbapi.com/?s=superman&page=2&apikey=8cba7ddb");
  return await response.json();
};

const posts = async () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = postsView;

  const postsElement = divElement.querySelector("#posts");
  const totalPosts = divElement.querySelector('#total');

  const posts = await getPosts();

  posts.forEach((post) => {
    postsElement.innerHTML += `
      <li class="list-group-item border-primary bg-dark text-white">
      <h5>${post.Title}</h5>
      <p>
      ${post.Plot}
      </p>
      </li>
    `;
  });

  totalPosts.innerHTML += posts.length;

  return divElement;
};

export { posts };
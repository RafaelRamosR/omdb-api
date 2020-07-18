/*
  Save data to current localStorage
*/
const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

/*
  Access stored data
*/
const getStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

/*
  User session
*/
const verificateSession = () => sessionStorage.getItem('userSession');
/*
  Obtain specific data from the logged in user
*/
const getUserData = (typeData) => {
  const userKey = sessionStorage.getItem('userId');
  const dataUser = getStorage(userKey);

  switch (typeData) {
    case 'id':
      return dataUser.id;
    case 'picture':
      return dataUser.photo;
    case 'name':
      return dataUser.name;
    case 'pass':
      return dataUser.pass;
    case 'movies':
      return dataUser.favoriteMovies;
    default:
      return false;
  }
};

/*
  Add new user or load the data of an already registered user
*/
const setUserData = (typeData, newData) => {
  const userKey = sessionStorage.getItem('userId');
  const dataUser = getStorage(userKey);

  switch (typeData) {
    case 'id':
      dataUser.id = newData;
      break;
    case 'picture':
      dataUser.photo = newData;
      break;
    case 'name':
      dataUser.name = newData;
      break;
    case 'pass':
      dataUser.pass = newData;
      break;
    case 'movies':
      dataUser.favoriteMovies = newData;
      break;
    default:
      return false;
  }

  const newDataUser = {
    id: dataUser.id,
    photo: dataUser.photo,
    name: dataUser.name,
    pass: dataUser.pass,
    favoriteMovies: dataUser.favoriteMovies,
  };

  return setStorage(userKey, newDataUser);
};

/*
  Add or remove favorite movies
*/
const favoriteToggle = (idMovie) => {
  const arrMovies = getUserData('movies');

  if (!arrMovies.includes(idMovie)) {
    arrMovies.push(idMovie);
  } else {
    const index = arrMovies.indexOf(idMovie); // obtenemos el indice
    arrMovies.splice(index, 1); // 1 es la cantidad de elemento a eliminar
  }

  setUserData('movies', arrMovies);
};

/*
  Try to handle API
  It is not much, but it is honest work
*/
const getMovies = async (typeSearch, movie, page) => {
  const key = '8cba7ddb';
  const apiUrl = 'http://www.omdbapi.com/';
  let apiParameters = `?${typeSearch}=${movie}&page=${page}&type=movie&apikey=${key}`;

  if (page === 'full' || page === 'short') {
    apiParameters = `?${typeSearch}=${movie}&plot=${page}&type=movie&apikey=${key}`;
  }

  const response = await fetch(apiUrl + apiParameters);
  const data = response.json();

  if (data.Poster === 'N/A') {
    data.Poster = './assets/img/not-found.png';
  }
  return data;
};

const model = {
  verificateSession,
  setStorage,
  getStorage,
  setUserData,
  getUserData,
  favoriteToggle,
  getMovies,
};
export default model;

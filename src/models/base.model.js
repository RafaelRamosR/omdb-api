/*
  Save data to current localStorage
*/
const setStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

/*
  Access stored data
*/
const getStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

/*
  Iterate keys to show all tasks stored in localStorage
*/
const getAllStorage = () => {
  // divTask.textContent = '';
  for (let i = 0; i <= localStorage.length - 1; i += 1) {
    const key = localStorage.key(i);
    getStorage(key);
  }
};

/*
  Remove parent container from button
  and delete an item from localStorage
*/
const deleteStorage = (key, divContent) => {
  divContent.remove();
  localStorage.removeItem(key);
};

/*
  session
*/
const verificateSession = () => {
  return sessionStorage.getItem('userSession')
}

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
}

const setUserData = (typeData,newData) => {
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
  }

  setStorage(userKey, newDataUser);
}

const favoriteToggle = (idMovie) => {
  const arrMovies = getUserData('movies');

  if(!arrMovies.includes(idMovie)){
    arrMovies.push(idMovie);
  }else{
    const index = arrMovies.indexOf(idMovie); // obtenemos el indice
    arrMovies.splice(index, 1); // 1 es la cantidad de elemento a eliminar
  }

  setUserData('movies', arrMovies);
}

const model = {
  verificateSession,
  setStorage,
  getStorage,
  setUserData,
  getUserData,
  favoriteToggle,
}

export { model };
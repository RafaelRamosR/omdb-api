import { model } from '../models/base.model.js';

const userVerification = (key, picture, username, password) => {
  const localData = model.getStorage(key);
  let userData = {};

  if (localData !== null) {
    userData = localData;
    return userData;
  }

  if (picture === '') {
    picture = 'default.png';
  }

  userData = {
    id: key,
    photo: picture,
    name: username,
    pass: password,
    favoriteMovies: [],
  }
  return userData;
}

export { userVerification };
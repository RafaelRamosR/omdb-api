import model from '../models/base.model.js';

const userVerification = (key, picture, username, password) => {
  const localData = model.getStorage(key);
  let userData = {};
  let img = picture;

  if (localData !== null) {
    userData = localData;
    return userData;
  }

  if (picture === '') {
    img = 'default.png';
  }

  userData = {
    id: key,
    photo: img,
    name: username,
    pass: password,
    favoriteMovies: [],
  };
  return userData;
};

export default userVerification;

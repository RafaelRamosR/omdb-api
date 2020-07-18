import model from '../models/base.model';

export default userVerification = (key, picture, username, password) => {
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

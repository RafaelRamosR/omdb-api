import { model } from '../models/base.model.js'

const itemUser = (item) => {
  const fragment = document.createDocumentFragment();
  const spanUserName = document.createElement('span');
  spanUserName.classList.add('avatar-name');
  spanUserName.textContent = model.getUserData('name');

  const imgUserPicture = document.createElement('img');
  imgUserPicture.classList.add('avatar-img');
  const userPicture = model.getUserData('picture');
  imgUserPicture.setAttribute('src', './assets/img/' + userPicture);
  imgUserPicture.setAttribute('alt', 'avatar');

  fragment.appendChild(spanUserName);
  fragment.appendChild(imgUserPicture);
  item.appendChild(fragment);
}

const navbarItemsToggle = (logged) => {
  const infoUser = document.getElementById('infoUser');
  const navLogin = document.getElementById('login');
  const navLogout = document.getElementById('logout');

  if (logged === true) {
    navLogin.classList.add('hidden');
    navLogout.classList.remove('hidden');
    infoUser.classList.remove('hidden');
    itemUser(infoUser);
  } else {
    navLogin.classList.remove('hidden');
    navLogout.classList.add('hidden');
    infoUser.classList.add('hidden');
    infoUser.textContent = '';
  }
}

export { navbarItemsToggle };
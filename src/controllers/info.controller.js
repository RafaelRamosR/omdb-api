import { infoView } from '../views/info.view.js';
import { model } from '../models/base.model.js'

const infoMovie = () => {;
  const fragment = document.createDocumentFragment();
  const infoSection = document.createElement('section');
  infoSection.innerHTML = infoView;

  return infoSection;
}

export { infoMovie };
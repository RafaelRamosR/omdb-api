/*
  Save data to current localStorage
*/
const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};

/*
  Access stored data
*/
const getStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  insertData(data);
};

/*
  Iterate keys to show all tasks stored in localStorage
*/
const getAllStorage = () => {
  divTask.textContent = '';
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
  // localStorage.removeItem(key);
};
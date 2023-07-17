const fetchFun = (onSucces) => () => {
  return fetch("https://25.javascript.pages.academy/kekstagram/data")
    .then((responce) => responce.json())
    .then((data) => onSucces(data));
};

export { fetchFun };

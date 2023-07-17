// import { details } from "./createCards.js";
import { isEscapeKey } from "../support/support.js";

let bigPicture = document.querySelector(".big-picture");
let pictureContainer = document.querySelector(".pictures");
let comments = document.querySelector(".social__comments");

let commentsLoader = bigPicture.querySelector(".social__comments-loader");
let socialCommentCount = bigPicture.querySelector(".comments-count");
let currentSocialCommentCount = bigPicture.querySelector(
  ".comments-count__current"
);
let comment = (avatar, text) => {
  return ` <li class="social__comment">
                <img class="social__picture" src="${avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
                <p class="social__text">
                  ${text}
                </p></li>`;
};
let count = 1;

// рисуем миникарточки
document.querySelector(".pictures__title").classList.remove("visually-hidden");
let mini = (id, img, description, comments, likes, commentsText) => {
  return `<div class="picture" data-id ='${id}' >
      <a href="#" class="picture__link">
        <img class="picture__img" src="${img}" width="182" height="182" alt="${description}">
        <p class="picture__info">
          <span class="picture__comments" >${comments}</span>
          <span class="picture__likes">${likes}</span>
          <ul class="social__comments hidden">
          ${commentsText}
          </ul>
      </a>
    </div>`;
};
const fetchFun = (fun, dataFun) => () => {
  return fetch("https://25.javascript.pages.academy/kekstagram/data")
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
    })
    .then((data) => {
      dataFun(data);
      fun();
    });
};

let create = (data) => {
  data.forEach((el) => {
    let com = "";
    el.comments.forEach((elCom) => {
      com += comment(elCom.avatar, elCom.message) + `\r\n`;
    });

    let createMini = mini(
      el.id,
      el.url,
      el.description,
      el.comments.length,
      el.likes,
      com
    );

    pictureContainer.insertAdjacentHTML("beforeend", createMini);
  });
};

let details = () => {
  let minPictures = document.querySelectorAll(".picture");
  for (let i = 0; i < minPictures.length; i++) {
    let mini = minPictures[i];
    mini.addEventListener("click", (evt) => {
      evt.preventDefault();
      count = 1;
      bigPicture.classList.remove("hidden");
      let comDetailContainer = bigPicture.querySelector(".social__comments");
      comDetailContainer.innerHTML = "";
      //Подставляем картинку
      let bigPictureImg = bigPicture.querySelector(".big-picture__img img");
      bigPictureImg.src = mini.querySelector("img").src;
      //Подставляем описание
      bigPicture.querySelector(".social__caption").textContent =
        mini.querySelector("img").alt;
      //Подставляем лайки
      bigPicture.querySelector(".likes-count").textContent =
        mini.querySelector(".picture__likes").textContent;
      //Комментарии
      let comms = mini.querySelectorAll(".social__comment");
      //Вставляем комментарии
      let pasteComments = (count) => {
        count.forEach((comm) => {
          let createCommsDetail = comment(
            comm.querySelector(".social__picture").src,
            comm.querySelector(".social__text").textContent
          );
          comDetailContainer.insertAdjacentHTML("beforeend", createCommsDetail);
        });
      };
      //Получаем массив из нодлиста
      let commsArray = Array.from(comms);
      //разбиваем массив на части по 5
      let subarray = []; //массив в который будет выведен результат.
      for (let i = 0; i < Math.ceil(commsArray.length / 5); i++) {
        subarray[i] = commsArray.slice(i * 5, i * 5 + 5);
      }
      //Скрываем загрузить еще если, полученный массив состоит из одного
      if (subarray.length == 1) {
        commentsLoader.classList.add("hidden");
      }
      //Устанавливаем значения
      socialCommentCount.textContent = commsArray.length;
      currentSocialCommentCount.textContent = commsArray.length;
      //Проверка на количество комментариев, если их больше, задаем дефолтное значение, если меньше, то оставляем прошлое
      if (commsArray.length > 5) {
        currentSocialCommentCount.textContent = 5;
      }
      // первый массив комментариев, который мы выводим + инициализация переменной-счетчика
      pasteComments(subarray[0]);

      // при нажатии на загрузить еще логика такая: Если существует текущая итерация в подмассиве мы прибавляем к дефолтномы значению, количество данных в подмасиве и добавляем их на страницу
      let addMoreComments = (e) => {
        e.preventDefault();
        count++;
        if (subarray[count - 1]) {
          currentSocialCommentCount.textContent =
            Number(currentSocialCommentCount.textContent) +
            subarray[count - 1].length;
          pasteComments(subarray[count - 1]);
        }
        // Если есть еще в счетчике, то мы убираем hidden, иначе мы его убираем
        currentSocialCommentCount + 5;
        if (subarray.length > 0) {
          if (subarray.length > count) {
            commentsLoader.classList.remove("hidden");
          } else {
            commentsLoader.classList.add("hidden");
          }
        } else {
          commentsLoader.classList.add("hidden");
        }
      };
      commentsLoader.addEventListener("click", addMoreComments);
      document.addEventListener("keydown", (e) => {
        if (isEscapeKey(e)) {
          console.log(count);
          count = 1;
          e.preventDefault(e);
          bigPicture.classList.add("hidden");
          commentsLoader.classList.remove("hidden");
          commentsLoader.removeEventListener("click", addMoreComments);
        }
      });

      //Поведение по нажатию на крестик
      bigPicture
        .querySelector(".big-picture__cancel")
        .addEventListener("click", (evt) => {
          count = 1;
          commentsLoader.classList.remove("hidden");
          bigPicture.classList.add("hidden");

          commentsLoader.removeEventListener("click", addMoreComments);
        });

      // commentsLoader.removeEventListener("click", addMoreComments);

      // Устанавливаем значение по умолчанию и делаем логику, проверки
    });
  }
};

let res = fetchFun(details, create);
res();

//поведение при нажатии на esc

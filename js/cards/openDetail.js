import { details } from "./createCards.js";

let bigPicture = document.querySelector(".big-picture");
let pictureContainer = document.querySelector(".pictures");
let comments = document.querySelector(".social__comments");

let comment = (avatar, text) => {
  return ` <li class="social__comment">
                <img class="social__picture" src="${avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
                <p class="social__text">
                  ${text}
                </p></li>`;
};

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

details().forEach((el) => {
  let com = "";
  el.comments.forEach((elCom) => {
    com += comment(elCom.avatar, elCom.message) + `\r\n`;
  });
  el.descriptionStat;
  let createMini = mini(
    el.id,
    el.url,
    el.descriptionStat,
    el.comments.length,
    el.likes,
    com
  );

  pictureContainer.insertAdjacentHTML("beforeend", createMini);
});

let minPictures = document.querySelectorAll(".picture");

for (let i = 0; i < minPictures.length; i++) {
  let mini = minPictures[i];
  mini.addEventListener("click", (evt) => {
    evt.preventDefault();
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
    let comms = mini.querySelectorAll(".social__comment");
    comms.forEach((comm) => {
      let createCommsDetail = comment(
        comm.querySelector(".social__picture").src,
        comm.querySelector(".social__text").textContent
      );
      console.log(createCommsDetail);
      comDetailContainer.insertAdjacentHTML("beforeend", createCommsDetail);
    });
  });

  let hiddenComments = bigPicture
    .querySelector(".social__comment-count")
    .classList.add("hidden");
  let hiddenUploads = bigPicture
    .querySelector(".comments-loader")
    .classList.add("hidden");
}

bigPicture
  .querySelector(".big-picture__cancel")
  .addEventListener("click", (evt) => {
    bigPicture.classList.add("hidden");
  });

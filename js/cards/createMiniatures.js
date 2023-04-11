import { details } from "./createCards.js";

const userPicture = document
  .querySelector("#picture")
  .content.querySelector(".picture");
console.log(userPicture);
const pictureContainer = document.querySelector(".pictures");

document.querySelector(".pictures__title").classList.remove("visually-hidden");

const similarPicture = details();

similarPicture.forEach(({ id, likes, url, description, comments }) => {
  const pictureEl = userPicture.cloneNode(true);
  pictureEl.querySelector(".picture__img").src = url;
  pictureEl.querySelector(".picture__img").alt = description;
  pictureEl.querySelector(".picture__likes").textContent = likes;
  pictureEl.querySelector(".picture__comments").textContent =
    comments.length - 1;
  pictureContainer.appendChild(pictureEl);
});

export { userPicture, similarPicture };

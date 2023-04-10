import "./generation.js";
import { generator } from "./generation.js";

const userPicture = document
  .querySelector("#picture")
  .content.querySelector(".picture");

const pictureContainer = document.querySelector(".pictures");

document.querySelector(".pictures__title").classList.remove("visually-hidden");

const similarPicture = generator();

similarPicture.forEach(({ id, likes, url, description, comments }) => {
  const pictureEl = userPicture.cloneNode(true);
  pictureEl.querySelector(".picture__img").src = url;
  pictureEl.querySelector(".picture__img").alt = description;
  pictureEl.querySelector(".picture__likes").textContent = likes;
  // pictureEl.querySelector(".picture__comments").textContent =
  //   comments.length - 1;
  console.log(comments);
  pictureContainer.appendChild(pictureEl);
});

export { userPicture, similarPicture };

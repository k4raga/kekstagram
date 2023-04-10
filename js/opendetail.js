import { userPicture, similarPicture } from "./miniature.js";

console.log(similarPicture);
console.log(userPicture);

let clickPicktures = document.querySelectorAll(".picture");

for (let i = 0; i < clickPicktures.length; i++) {
  let clickPickture = clickPicktures[i];

  clickPickture.addEventListener("click", (evt) => {
    evt.preventDefault();
    popupPicture.querySelector("img").src =
      clickPickture.querySelector("img").src;
    popupPicture.querySelector(".likes-count").textContent =
      clickPickture.querySelector(".picture__likes").textContent;

    popupPicture.classList.remove("hidden");
  });
}

let popupPicture = document.querySelector(".big-picture");

let hiddenComments = popupPicture
  .querySelector(".social__comment-count")
  .classList.add("hidden");
let hiddenUploads = popupPicture
  .querySelector(".comments-loader")
  .classList.add("hidden");

popupPicture.addEventListener("click", (evt) => {
  popupPicture.classList.add("hidden");
});

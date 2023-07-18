import { close, show } from "../support/support.js";
import "../../pristine/pristine.min.js";
import { isEscapeKey } from "../support/support.js";

const form = document.querySelector(".img-upload__form");
const overlay = document.querySelector(".img-upload__overlay");
const body = document.querySelector("body");
const cancelButton = document.querySelector("#upload-cancel");
const fileField = document.querySelector("#upload-file");
const hashtagField = document.querySelector(".text__hashtags");
const commentField = document.querySelector(".text__description");

let chrome = document.querySelector("#effect-chrome");
let sepia = document.querySelector("#effect-sepia");
let marvin = document.querySelector("#effect-marvin");
let phobos = document.querySelector("#effect-phobos");
let heat = document.querySelector("#effect-heat");
let img = document.querySelector(".img-upload__preview");
let orig = document.querySelector("#effect-none");

let scaleBigger = document.querySelector(".scale__control--bigger");
let scaleSmaller = document.querySelector(".scale__control--smaller");
let scaleValue = document.querySelector(".scale__control--value");
let sliderElement = document.querySelector(".effect-level__slider");
let valueElement = document.querySelector(".effect-level__value");
let filterName = "";
let units = "";

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(form, {
  classTo: "img-upload__element",
  errorTextParent: "img-upload__element",
  errorTextClass: "img-upload__error",
});

const showModal = () => {
  overlay.classList.remove("hidden");
  body.classList.add("modal-open");
  document.addEventListener("keydown", onEscKeyDown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add("hidden");
  body.classList.remove("modal-open");
  document.removeEventListener("keydown", onEscKeyDown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onEscKeyDown(evt) {
  if (evt.key === "Escape" && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const startsWithHash = (string) => string[0] === "#";

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(" ")
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  "Неправильно заполнены хэштеги"
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener("change", onFileInputChange);
cancelButton.addEventListener("click", onCancelButtonClick);
form.addEventListener("submit", onFormSubmit);
export { hideModal };

// ===================================

const reset = function () {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  img.className = origClass;
  img.style.filter = "";
  scaleValue.setAttribute("value", "100%");
  img.style.transform = "scale(1)";
};

function sliderCreate(
  filterName = "",
  units = "",
  rangeMin = 0,
  rangeMax = 1,
  start = 1,
  step = 0.1,
  value = 1
) {
  filterName = filterName;
  valueElement.value = value;
  img.style.filter = filterName + "(" + valueElement.value + units + ")";

  noUiSlider.create(sliderElement, {
    range: {
      min: rangeMin,
      max: rangeMax,
    },
    start: start,
    step: step,
    connect: "lower",
  });
  sliderElement.noUiSlider.on("update", (...rest) => {
    valueElement.value = sliderElement.noUiSlider.get();
    img.style.filter = filterName + "(" + valueElement.value + units + ")";
    img.setAttribute("value", img.style.filter);
  });
}

let optionsImg = { filterName: "", units: "", min: 0.1, max: 1, step: 0.1 };

scaleValue.value = "100%";
img.style.transform = "scale(1)";
scaleValue.setAttribute("value", scaleValue.value);
console.log(scaleValue.value);
let scaleNum = Number(scaleValue.value.slice(0, -1));

scaleBigger.addEventListener("click", () => {
  if (scaleNum == 100) {
    scaleValue.value = "100%";
  } else {
    scaleNum += 25;
    scaleValue.value = scaleNum + "%";
    scaleValue.setAttribute("value", scaleValue.value);
    img.style.transform = "scale(" + scaleNum * 0.01 + ")";
  }
});
scaleSmaller.addEventListener("click", () => {
  if (scaleNum == 25) {
    scaleValue.value = "25%";
  } else {
    scaleNum = scaleNum - 25;
    scaleValue.value = scaleNum + "%";
    scaleValue.setAttribute("value", scaleValue.value);
    img.style.transform = "scale(" + scaleNum * 0.01 + ")";
  }
});

let origClass = "img-upload__preview ";

chrome.addEventListener("click", () => {
  reset();
  sliderCreate("grayscale");
});

sepia.addEventListener("click", () => {
  reset();
  sliderCreate("sepia");
});

marvin.addEventListener("click", () => {
  reset();
  sliderCreate("invert", "%", 0, 100, 100, 1, 100);
});

phobos.addEventListener("click", () => {
  reset();
  sliderCreate("blur", "px", 0, 3, 3, 0.1, 3);
});

heat.addEventListener("click", () => {
  reset();
  sliderCreate("brightness", "", 1, 3, 3, 0.1, 3);
});

orig.addEventListener("click", () => {
  reset();
});

// ==============================================

let showSucces = function () {
  return `<section class="success hidden">
      <div class="success__inner">
        <h2 class="success__title">Изображение успешно загружено</h2>
        <button type="button" class="success__button">Круто!</button>
      </div>
    </section>`;
};

let showErrorLoad = function () {
  return `<section class="error hidden">
      <div class="error__inner">
        <h2 class="error__title">Ошибка загрузки файла</h2>
        <button type="button" class="error__button">
          Загрузить другой файл
        </button>
      </div>
    </section>`;
};

body.insertAdjacentHTML("beforeend", showSucces);
body.insertAdjacentHTML("beforeend", showErrorLoad);

let errorPopup = document.querySelector(".error");
let otherFile = document.querySelector(".error__button");
let successPopup = document.querySelector(".success");
let successBtn = document.querySelector(".success__button");

let closePopup = function (targetClick, target) {
  targetClick.addEventListener("click", (e) => {
    e.preventDefault();
    target.classList.add("hidden");
  });
};

document.addEventListener("keydown", (e) => {
  if (isEscapeKey(e)) {
    e.preventDefault(e);
    reset();
    successPopup.classList.add("hidden");
  }
});

otherFile.addEventListener("click", (e) => {
  errorPopup.classList.add("hidden");
  reset();
  showModal();
});

closePopup(successBtn, successPopup);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  console.log(formData);
  fetch("https://25.javascript.pages.academy/kekstagram", {
    method: "POST",
    credentials: "same-origin",
    "Content-type": "multipart/form-data",
    body: formData,
  })
    .then((responce) => {
      if (responce.ok) {
        hideModal();
        reset();
        showSucces();
        successPopup.classList.remove("hidden");
      } else {
        hideModal();
        reset();
        errorPopup.classList.remove("hidden");
      }
      return responce.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
// ===========================================

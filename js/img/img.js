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

function reset() {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  img.className = origClass;
  img.style.filter = "";
}

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

let optionsImg = {
  filterName: "",
  units: "",
  min: 0.1,
  max: 1,
  step: 0.1,
};

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
if (sliderElement.noUiSlider) {
}

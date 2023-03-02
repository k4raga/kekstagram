function getRandomPositiveInteger(a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function checkLength(checkString, maxlength) {
  return checkString.toString().length < maxlength;
}


console.log(getRandomPositiveInteger(10, 5));
console.log(checkLength(9, 10));


const show = (sel) => {
  sel.classList.remove("hidden");
};

const close = (sel) => {
  sel.classList.add("hidden")
};

export {getRandomPositiveInteger, checkLength, show, close};

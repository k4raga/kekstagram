function randNum(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}



// function checkLength(checkString, maxlength) {
//   return checkString.toString().length < maxlength;
// }

const commentNumber = Array(6);
const idNumber = Array(25);
const photoNumber = Array(3);

const commentNumArr = Array.from({ length: randNum(1, 4) }, () =>
  Math.floor(Math.random() * commentNumber.length + 1)
);


const idNumArr = Array.from(idNumber, (_, index) => index + 1);

const photoNumArr = Array.from(photoNumber, (_, index) => index + 1);

export { randNum, idNumArr, photoNumArr, commentNumArr };
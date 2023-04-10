import { randNum } from "./rand.js";
import { nameStat, messageStat, descriptionStat } from "./date.js";

let commentNumber = [1, 2, 3, 4, 5, 6];

const RandComment = Array.from(
  { length: randNum(1, 4) },
  () => Math.floor(Math.random() * commentNumber.length + 1)
);
console.log("randComment " + RandComment);

const idGenerator = Array.from(Array(25), (_, index) => index + 1);
console.log(idGenerator);

const photoGenerator = Array.from(Array(3), (_, index) => index + 1);
console.log(photoGenerator);

const createCom = (i) => ({
  id: i,
  avatar: `img/avatar-${randNum(1, 6)}.svg`,
  messageStat: messageStat[randNum(1, 5)],
  nameStat: nameStat[randNum(1, 24)],
});

const generatorCom = Array.from(photoGenerator, createCom);

function generatorComv2(i) {
  return {
    id: i,
    avatar: `img/avatar-${randNum(1, 6)}.svg`,
    messageStat: messageStat[randNum(1, 5)],
    nameStat: nameStat[randNum(1, 24)],
  };
}

console.log(generatorComv2(1));
const createObj = (i) => {
  return {
    id: i,
    url: `photos/${[i]}.jpg`,
    descriptionStat: descriptionStat[randNum(1, 25)],
    likes: randNum(15, 200),
    // comments: RandComment,
  };
};

console.log('create ' + createObj(5).comments);

const generator = () => Array.from(idGenerator, createObj);

console.log('generator ' + generator());



export { generator };

import { getRandomPositiveInteger } from './util.js';
import { name, message, description } from './date.js';

const idGenerator = Array.from(Array(25), (_, index) => index + 1);
console.log(idGenerator);

const photoGenerator = Array.from(Array(3), (_, index) => index + 1);
console.log(photoGenerator);

const createCom = (i) => ({
  id: i,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: message[getRandomPositiveInteger(1, 5)],
  name: name[getRandomPositiveInteger(1, 24)],
});

const generatorCom = Array.from(photoGenerator, createCom);

function generatorComv2(i) {
  return {
    id: i,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: message[getRandomPositiveInteger(1, 5)],
    name: name[getRandomPositiveInteger(1, 24)],
  };
}


console.log(generatorComv2(1));
// eslint-disable-next-line arrow-body-style
const createObj = (i) => {
  return {
    id: i,
    url: `photos/${[i]}.jpg`,
    description: description[getRandomPositiveInteger(1, 25)],
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: getRandomPositiveInteger(1, 8)}, generatorComv2),
  };
};

console.log(createObj)

const generator = () => Array.from(idGenerator, createObj);

// const testOb = {
//   id: idGenerator[0],
//   url: 'photos/' + photoGenerator[0] + '.jpg',
//   description: 'Описание',
//   likes: 15,
//   comments: [
//     {
//       id: 135,
//       avatar: 'img/avatar-6.svg',
//       message: 'Все хорошо',
//       name: 'Артем',
//     },
//     {
//       id: 145,
//       avatar: 'img/avatar-6.svg',
//       message: 'Все не хорошо',
//       name: 'Куми',
//     },
//     {
//       id: 155,
//       avatar: 'img/avatar-6.svg',
//       message: 'Все плохо',
//       name: 'Катя',
//     },
//   ],
// };

console.log(generator());

export { generator };

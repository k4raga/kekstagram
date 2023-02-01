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


const idGenerator = Array.from(Array(25), (_, index) => index + 1);
console.log(idGenerator);

const photoGenerator = Array.from(Array(3), (_, index) => index + 1);
console.log(photoGenerator);

const description = [
  'Наваждение',
  'прогонит грусть наверняка',
  'накроет город с головой',
  'Дмитрий Почемучка',
  'Тамара Фёдоровна Москаленко',
  'они беспечны до конца',
  'Скоро уснёшь ты',
  'Искупалось солнце',
  'Сдави и омой дрожащую кость',
  'И на жизни злой намек,',
  'И будет все не так, как здесь решим мы.',
  'Открою глаза. Распахну шторы',
  'Илья Раманов',
  'кривляться перед вами не захочется — и вот',
  'Повтор',
  'Июнь',
  'Пуд соли, взятый до последней горстки,',
  'Сдави и омой дрожащую кость',
  'В сбруе бурь покорны',
  'вытечет по человеку ваш обрюзгший жир,',
  'Лариса Белоус',
  'У нее еще вчера,',
  'Ты попробуй без вопросов. Сам не знаю, как нас носит.',
  'Яблоком',
  'Дети обнимут за шею небо',
];

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const name = [
  'Александра',
  'Мария',
  'Михаил',
  'Анна',
  'София',
  'Мирон',
  'Леон',
  'Кира',
  'Алёна',
  'Филипп',
  'Артём',
  'Екатерина',
  'Вероника',
  'Илья',
  'Никита',
  'Василиса',
  'Анастасия',
  'Вера',
  'Владислава',
  'Ангелина',
  'Андрей',
  'Константин',
  'Ева',
  'Софья',
  'Марк',
];
console.log('Длинна' + name.length)
const createCom = (i) => ({
  id: i,
  avatar: `img/avatar-${  getRandomPositiveInteger(1, 6) }.svg`,
  message: message[getRandomPositiveInteger(1, 5)],
  name: name[getRandomPositiveInteger(1, 24)]
});

const generatorCom = Array.from(photoGenerator, createCom);
console.log(generatorCom);
const createObj = (i) => ({
  id: i,
  url: `photos/${  [i] }.jpg`,
  description: description[getRandomPositiveInteger(1, 25)],
  likes: getRandomPositiveInteger(15, 200),
  comments: [generatorCom]
});

const generator = Array.from(idGenerator, createObj);

console.log(generator);
const testOb = {
  id: idGenerator[0],
  url: 'photos/' + photoGenerator[0] +'.jpg',
  description: 'Описание',
  likes: 15,
  comments: [{
    id: 135,
    avatar: 'img/avatar-6.svg',
    message: 'Все хорошо',
    name: 'Артем'
  }, {
    id: 145,
    avatar: 'img/avatar-6.svg',
    message: 'Все не хорошо',
    name: 'Куми'
  }, {
    id: 155,
    avatar: 'img/avatar-6.svg',
    message: 'Все плохо',
    name: 'Катя'
  }]
};

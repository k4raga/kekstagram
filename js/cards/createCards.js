import { randNum, idNumArr } from "../support/rand.js";
import { nameStat, messageStat, descriptionStat } from "./date.js";

const details = () => {
  const comments = (i) => {
    let createComment = () => {
      return {
        id: randNum(1, 100),
        avatar: `img/avatar-${randNum(1, 6)}.svg`,
        messageStat: messageStat[randNum(1, 5)],
        nameStat: nameStat[randNum(1, 24)],
      };
    };
    return Array.from(Array(i), () => createComment());
  };
  let createDetail = (i) => {
    return {
      id: i,
      url: `photos/${[i]}.jpg`,
      descriptionStat: descriptionStat[randNum(1, 25)],
      likes: randNum(15, 200),
      comments: comments(randNum(1, 6)),
    };
  };
  return Array.from(idNumArr, createDetail);
};

export { details };

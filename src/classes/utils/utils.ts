import { WordDefenition } from "../../types/types";

export default class Util {
  static pickRandomWord(wordsArray:WordDefenition[]):WordDefenition {
    const len = wordsArray.length;
    const index = Math.floor(Math.random()*len);

    return wordsArray[index];
  }
}
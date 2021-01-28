import {Answer} from "./answer";

export class Question {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  answersSet: Answer[];
  game: string;

  constructor() {
  }

  equals(anotherQuestion: Question): boolean {
    if (anotherQuestion.answersSet.length !== this.answersSet.length) {
      return false;
    }
    for (let i = 0; i < this.answersSet.length; i++) {
      if (!anotherQuestion.answersSet[i].equals(this.answersSet[i])) {
        return false;
      }
    }
    return anotherQuestion.id == this.id
      && anotherQuestion.title == this.title
      && anotherQuestion.description == this.description
      && anotherQuestion.category == this.category
      && anotherQuestion.level == this.level
      && anotherQuestion.game == this.game;
  }
}

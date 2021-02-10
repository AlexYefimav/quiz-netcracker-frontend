import {Answer} from './answer';

export class Question {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  answersSet: Answer[];
  game: string;
  photo: string;
  temporaryIndex: number;

  constructor() {
  }
}

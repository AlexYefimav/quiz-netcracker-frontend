import {Question} from './question';

export class Game{
  id: string;
  title: string;
  description: string;
  questions: Question[];
  user: string;
  photo: string;
  player: string;
  index: number;

  constructor() {
  }
}

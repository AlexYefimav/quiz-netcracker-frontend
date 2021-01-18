import {Question} from './question';

export class Game{
  id: string;
  title: string;
  description: string;
  questions: Question[];
  user: string;

  constructor() {
  }
}

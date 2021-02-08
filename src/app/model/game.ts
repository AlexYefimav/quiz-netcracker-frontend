import {Question} from './question';
import {GameCategory} from "./game-category";

export class Game{
  id: string;
  title: string;
  description: string;
  questions: Question[];
  user: string;
  photo: string;
  player: string;
  index: number;
  access: string;
  gameCategory: string;
  views: string;

  constructor() {
  }
}

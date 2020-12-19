import {Answer} from "./answer";

export class Question {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  answers: Answer[];
}

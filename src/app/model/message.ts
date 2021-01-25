import {Game} from "./game";

export class Message {
  games: Game[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

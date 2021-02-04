import {Game} from "./game";
import {User} from "./user";

export class Message {
  games: Game[];
  users: User[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

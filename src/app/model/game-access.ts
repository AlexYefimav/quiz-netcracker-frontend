import {Player} from "./player";
import {Game} from "./game";

export class GameAccess {
  id: string;
  playerId: Player;
  gameId: Game;
  access: boolean;
}

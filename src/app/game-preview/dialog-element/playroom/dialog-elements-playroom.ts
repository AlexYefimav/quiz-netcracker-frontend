import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GameRoomService} from "../../../service/game-room.service";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-playroom.html',
  styleUrls: ['./dialog-elements-playroom.css']
})
export class DialogElementsPlayroom {
  isCreator: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { game, gameRoom, player, socket },
              private gameRoomService: GameRoomService) {
    if (this.data.player.id == this.data.game.player) {
      this.isCreator = true;
    }
  }

  startGame() {
    this.data.socket.sendGoGame(this.data.gameRoom);
    this.data.socket.disconnect();
  }

  async deletePlayer(id: string) {
    let message = {
      name: this.data.player.name,
      recipientId: id,
      gameRoomId: this.data.gameRoom.id
    }
    this.data.socket.sendDeletePlayer(message);
  }
}

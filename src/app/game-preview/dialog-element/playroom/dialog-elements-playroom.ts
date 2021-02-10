import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-playroom.html',
  styleUrls: ['./dialog-elements-playroom.css', '../../game-preview.component.css']
})
export class DialogElementsPlayroom {
  isLoading = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { game, gameRoom, player, socket }) {
    this.isLoading = false;
  }

  startGame() {
    this.data.socket.sendGoGame(this.data.gameRoom);
    this.data.socket.disconnect();
  }

  deletePlayer(id: string) {
    let message = {
      name: this.data.player.login,
      recipientId: id,
      gameRoomId: this.data.gameRoom.id
    }
    this.data.socket.sendDeletePlayer(message);
  }
}

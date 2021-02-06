import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-playroom.html',
  styleUrls: ['./dialog-elements-playroom.css']
})
export class DialogElementsPlayroom {
  firstPlayer: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { game, gameRoom, player, socket }) {
    console.log(this.data.gameRoom);
    if(this.data.gameRoom.players[0].id==this.data.player.id){
      this.firstPlayer = true;
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

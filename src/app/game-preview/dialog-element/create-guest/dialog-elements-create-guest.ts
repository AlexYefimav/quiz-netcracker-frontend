import {Component, Inject} from "@angular/core";
import {Player} from "../../../model/player";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayerService} from "../../../service/player.service";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-create-guest.html',
  styleUrls: ['../../game-preview.component.css']
})
export class DialogElementsCreateGuest {
  private player: Player;

  constructor(public dialogRef: MatDialogRef<DialogElementsCreateGuest>,
              @Inject(MAT_DIALOG_DATA) public data: { guest },
              private playerService: PlayerService) {
  }

  saveGuest() {
    if (this.data.guest == undefined) {
      return;
    }
    this.playerService.saveGuest(this.data.guest).subscribe(player=>{
      this.player = player;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

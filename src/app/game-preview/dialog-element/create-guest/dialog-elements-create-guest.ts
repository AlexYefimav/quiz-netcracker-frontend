import {Component, Inject} from "@angular/core";
import {Player} from "../../../model/player";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayerService} from "../../../service/player.service";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-create-guest.html',
  styleUrls: ['./dialog-elements-create-guest.css']
})
export class DialogElementsCreateGuest {
  private player: Player;

  constructor(public dialogRef: MatDialogRef<DialogElementsCreateGuest>,
    @Inject(MAT_DIALOG_DATA) public data: { guest},
              private playerService: PlayerService) {
  }

  async saveGuest() {
    if(this.data.guest==undefined){
      return;
    }
    this.player = await this.playerService.saveGuest(this.data.guest).toPromise();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

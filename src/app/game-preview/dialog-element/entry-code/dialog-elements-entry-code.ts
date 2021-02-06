import {Component, Inject} from "@angular/core";
import {Player} from "../../../model/player";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayerService} from "../../../service/player.service";
import {Game} from "../../../model/game";
import {GameAccessService} from "../../../service/game-access.service";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-entry-code.html',
  styleUrls: ['./dialog-elements-entry-code.css']
})
export class DialogElementsEntryCode {
public code: string="";

  constructor(public dialogRef: MatDialogRef<DialogElementsEntryCode>,
    private gameAccessService: GameAccessService,
    @Inject(MAT_DIALOG_DATA) public data: { game }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async checkCode(code: string) {
    await this.gameAccessService.activateGameForPlayers(code).toPromise()
    setTimeout(function(){
      window.location.reload();
    }, 500);
  }
}

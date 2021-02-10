import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GameAccessService} from "../../../service/game-access.service";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-entry-code.html',
  styleUrls: ['../../game-preview.component.css']
})
export class DialogElementsEntryCode {
  public code: string = "";

  constructor(public dialogRef: MatDialogRef<DialogElementsEntryCode>,
              private gameAccessService: GameAccessService,
              @Inject(MAT_DIALOG_DATA) public data: { game }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkCode(code: string) {
    this.gameAccessService.activateGameForPlayers(code).subscribe(()=>{
      setTimeout(function () {
        window.location.reload();
      }, 500);
    })
  }
}

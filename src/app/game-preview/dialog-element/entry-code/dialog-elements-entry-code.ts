import {Component, Inject} from "@angular/core";
import {Player} from "../../../model/player";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlayerService} from "../../../service/player.service";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-entry-code.html',
  styleUrls: ['./dialog-elements-entry-code.css']
})
export class DialogElementsEntryCode {

  constructor(public dialogRef: MatDialogRef<DialogElementsEntryCode>,
    @Inject(MAT_DIALOG_DATA) public data: { game }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkCode() {

  }
}

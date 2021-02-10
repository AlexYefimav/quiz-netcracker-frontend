import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {AbstractControl} from '@angular/forms';
import {StorageService} from '../service/storage/storage.service';
import {ActivatedRoute} from '@angular/router';
import {PlayerService} from '../service/player.service';
import {Player} from '../model/player';
import {Game} from '../model/game';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css', '../app.component.css']
})
export class EditPlayerComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  player: Player;
  isUpdatePlayer: boolean;
  disable: string;
  picture: any;
  fileUrl: string;
  @Input() roleControl: AbstractControl;
  @Output() roleControlChange = new EventEmitter<AbstractControl>();
  isLoading = true;

  constructor(private  playerService: PlayerService,
              private  storageService: StorageService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.route.snapshot.params.id != undefined) {
      this.isUpdatePlayer = true;
      this.playerService.getOnePlayer(this.route.snapshot.params.id).subscribe(player => {
        this.player = player
        this.isLoading = false;
      });
    } else {
      this.isUpdatePlayer = false;
      this.player = new Player();
      this.isLoading = false;
    }
  }

  isDisable(): string {
    if (this.player.name != null && this.player.name != '' &&
      this.player.email != null && this.player.email != '') {
      this.disable = 'false';
    } else {
      this.disable = 'disable';
    }
    return this.disable;
  }

  private getPlayer(playerId: string): void {
    this.playerService.getOnePlayer(playerId).subscribe(player => {
      this.player = player;
    });
  }

  updatePlayer(): void {
    this.playerService.updatePlayer(this.player).subscribe(player => this.player = player);
  }

  selectFile(event) {
    this.picture = event.target.files[0];
    const formData = new FormData();
    const formData2 = new FormData();


    formData.append('file', this.picture);
    this.playerService.uploadFile(formData).subscribe((result) => {
        this.fileUrl = result.photo;
        formData2.append('url', this.fileUrl);
        formData2.append('gameId', this.player.id);
        this.playerService.updateFile(this.player.id, formData2).subscribe((res: Game) => {
            console.log(res);
            this.player.photo = res.photo;
          },
          err => console.error('Observer got an error: ' + err)
        );

      },
      err => console.error('Observer got an error: ' + err)
    );
  }
}

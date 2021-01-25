import {Component, OnInit} from '@angular/core';

import {PlayerService} from '../service/player.service';
import {UserService} from '../service/user.service';
import {StorageService} from '../service/storage/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/user';
import {Player} from "../model/player";
//import {Dialog} from '../../model/dialog';
//import {DialogsService} from '../../service/dialogs/dialogs.service';
//import {ScheduleEnum} from '../../model/schedule.enum';

@Component({
  selector: 'app-client-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {
  picture: any;
  account: User;
  player: Player;
  pageObserverRole: string;
  userID: string;
  isOwnAccount: boolean;

  constructor(private playerService:  PlayerService,
              private storageService: StorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  onFileChanged(event) {
    this.picture = event.target.files[0];
    const formData = new FormData();
    formData.append('id', this.storageService.currentUser.player_id.toString());
    formData.append('file', this.picture);
    this.playerService.changePhoto(formData).subscribe(result => this.player.photo = result.photo);
  }

  ngOnInit(): void {
    this.getClient();
   this.isOwnAccount = this.userID === this.storageService.currentUser.player;
    console.log("Init player"+this.storageService.currentUser.player);
    if (!StorageService.isEmpty()) {
      this.pageObserverRole = this.storageService.currentUser.role;
    }
  }

  getClient() {
  //  this.userID = this.route.snapshot.paramMap.get('id');
    this.userID =  this.storageService.currentUser.player;
    this.playerService.getOnePlayer(this.userID).subscribe(player=> {
      this.player = player;
    });
  }

}

import {Component, OnInit} from '@angular/core';

import {PlayerService} from '../service/player.service';
import {UserService} from '../service/user.service';
import {StorageService} from '../service/storage/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/user';
import {Player} from "../model/player";
import {Game} from "../model/game";
//import {Dialog} from '../../model/dialog';
//import {DialogsService} from '../../service/dialogs/dialogs.service';
//import {ScheduleEnum} from '../../model/schedule.enum';

@Component({
  selector: 'app-client-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {
  player: Player;

  constructor(private playerService:  PlayerService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPlayer();
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  getPlayer() {
    this.playerService.getOnePlayer(this.storageService.currentUser.id).subscribe(player=> {
      this.player = player;
    });
  }
  }

import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {StorageService} from "../storage/storage.service";
import {GameService} from "../game.service";
import {PlayerService} from "../player.service";
import {delay} from "rxjs/operators";

@Injectable()
export class UpdateGame implements CanActivate {

  constructor(private storageService: StorageService, private gameService: GameService,
              private playerService: PlayerService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let game;
    this.gameService.getShortGameById(route.params.gameId).subscribe(g => game = g);
    let player;
    this.playerService.getPlayerByUserId(this.storageService.currentUser.id).pipe(delay(1000)).subscribe(p => player = p);
    if (player?.id != game?.player) {
      this.redirect();
    }else{
      return true;
    }
  }

  redirect() {
    this.router.navigate(['403']);
  }
}

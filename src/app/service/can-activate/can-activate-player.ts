import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {StorageService} from "../storage/storage.service";
import {PlayerService} from "../player.service";

@Injectable()
export class CanActivatePlayer implements CanActivate {

  constructor(private storageService: StorageService, private router: Router, private playerService: PlayerService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let player;
    this.playerService.getOnePlayer(route.params.id).subscribe(p => player = p);
    if (!(this.storageService.currentUser.id == player.user)) {
      this.redirect();
    }


    return true;
  }

  redirect() {
    this.router.navigate(['403']);
  }
}

import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {StorageService} from "../storage/storage.service";

@Injectable()
export class Sign_up_and_sing_in implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.storageService.currentUser){
      this.redirect();
    }
    return true;
  }

  redirect() {
    this.router.navigate(['403']);
  }
}

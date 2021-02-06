import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivateCode} from "../model/activate-code";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  activationMessage: ActivateCode = {
    text: "No"
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  async ngOnInit() {
    this.activationMessage = await this.activate();
  }

  activate(): Promise<ActivateCode> {
    return this.userService.activateAccount(this.route.snapshot.params.code).toPromise();
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}

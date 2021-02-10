import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivateCode} from "../model/activate-code";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css', '../app.component.css']
})
export class ActivateAccountComponent implements OnInit {

  activationMessage: ActivateCode = {
    text: "No"
  };
  isLoading = true;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.activateAccount(this.route.snapshot.params.code).subscribe(message => {
      this.activationMessage = message;
      this.isLoading = false;
    });
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}

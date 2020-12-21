import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(wrapperForUser => {
      this.users = wrapperForUser.values;
    })
  }

}

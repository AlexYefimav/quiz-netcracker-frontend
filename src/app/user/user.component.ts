import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[];
  public user: User;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.userService.getUsers().subscribe(user =>
      this.users = user);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(user => this.user = user);
  }
}


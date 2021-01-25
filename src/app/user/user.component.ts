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

  async ngOnInit() {
    this.users = await this.getUser();
  }

  private getUser(): Promise<User[]> {
    return this.userService.getUsers().toPromise();
  }

  async deleteUser(id: string) {
    this.user = await this.userService.deleteUser(id).toPromise();
  }
}


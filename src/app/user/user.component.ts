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
  roles: string[] = ["USER", "ADMIN"];


  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    this.users = await this.getUser();
  }

  private getUser(): Promise<User[]> {
    return this.userService.checkUsers().toPromise();
  }

  private blockUser(id: string) {
    return this.userService.blockUser(id).toPromise()
  }

  async deleteUser(id: string) {
    this.user = await this.userService.deleteUser(id).toPromise();
  }
}


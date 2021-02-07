import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {StorageService} from "../service/storage/storage.service";
import {Router} from "@angular/router";
import {Message} from "../model/message";
import {Game} from "../model/game";
import {PageEvent} from "@angular/material/paginator";

const pageSize: number = 3;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[];
  public user: User;
  authorizedAccount: User;
  roles: string[] = ["USER", "ADMIN"];
  public pageSlice: User[];
  page: number;
  pageSize: number;
  currentSelectedPage: number = 0;
  totalPages: number = 0;
  pageIndexes: Array<number> = [];


  constructor(private userService: UserService,
              private storageService: StorageService,
              private router: Router) {
  }

  async ngOnInit() {
    if(this.checkAuthorized()!=undefined) {
  //  this.users = await this.getUsers();
      await this.getPage(0);
      this.users =  await this.getUsers();
      this.pageSlice = this.users.slice(0, pageSize);
    }
    else this.redirect('403');
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.authorizedAccount = this.storageService.currentUser;
      } else {
        StorageService.clear();
      }
    } else {
      this.authorizedAccount = undefined;
    }
    return this.authorizedAccount;
  }
  private getUsers(): Promise<User[]> {
    return this.userService.checkUsers().toPromise();
  }

  private blockUser(id: string) {
    return this.userService.blockUser(id).toPromise()
  }

  async deleteUser(id: string) {
    this.user = await this.userService.deleteUser(id).toPromise();
  }

  private getPage(page: number) {
    this.userService.getPageableUsers(page, pageSize)
      .subscribe(
        (message: Message) => {
          this.users = message.users;
          this.totalPages = message.totalPages;
          this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
          this.currentSelectedPage = message.pageNumber;
        }
      );
  }

  OnPageChange(event: PageEvent) {
    this.pageSlice = this.users.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize)
  }

}


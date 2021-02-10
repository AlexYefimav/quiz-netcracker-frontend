import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {StorageService} from '../service/storage/storage.service';
import {Router} from '@angular/router';
import {Message} from '../model/message';
import {PageEvent} from '@angular/material/paginator';

const pageSize: number = 3;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../app.component.css']
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
  isLoading = true;


  constructor(private userService: UserService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.checkAuthorized() != undefined) {
      //  this.users = await this.getUsers();
      this.getPage(0);
    } else this.redirect('403');
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

  blockUser(id: string) {
    return this.userService.blockUser(id).toPromise()
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(user => {
      this.user = user;
    });
  }

  private getPage(page: number) {
    this.userService.getPageableUsers(page, pageSize)
      .subscribe(
        (message: Message) => {
          this.users = message.users;
          this.totalPages = message.totalPages;
          this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
          this.currentSelectedPage = message.pageNumber;
          this.userService.checkUsers().subscribe(users => {
            this.users = users;
            this.pageSlice = this.users.slice(0, pageSize);
            this.isLoading = false;
          });
        }
      );
  }

  OnPageChange(event: PageEvent) {
    this.pageSlice = this.users.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize)
  }
}


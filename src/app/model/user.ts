import {Answer} from "./answer";

export class User{
  id: string;
  login: string;
  username: string;
  password: string;
  mail: string;
  role: string;
  player: string;
  isActive: boolean;
  usersSet: User[];
  active: boolean;
  constructor() {
  }

  equals(anotherAnswer: User): boolean {
    return anotherAnswer.id == this.id
      && anotherAnswer.login== this.login
      && anotherAnswer.mail == this.mail;
  }
  // equals(anotherUser: User): boolean {
  //   if (anotherUser.answersSet.length !== this.answersSet.length) {
  //     return false;
  //   }
  //   for (let i = 0; i < this.answersSet.length; i++) {
  //     if (!anotherUser.answersSet[i].equals(this.answersSet[i])) {
  //       return false;
  //     }
  //   }
  //   return anotherUser.id == this.id
  //     && anotherUser.title == this.title
  //     && anotherUser.description == this.description
  //     && anotherUser.category == this.category
  //     && anotherUser.level == this.level
  //     && anotherUser.game == this.game;
  // }


}


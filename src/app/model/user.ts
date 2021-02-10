export class User {
  id: string;
  login: string;
  username: string;
  password: string;
  mail: string;
  role: string;
  player: string;
  isActive: boolean;
  isAuthenticated: boolean;
  usersSet: User[];
  active: boolean;
  activationCode: string;
  index: number;

  constructor() {
  }

  equals(anotherAnswer: User): boolean {
    return anotherAnswer.id == this.id
      && anotherAnswer.login == this.login
      && anotherAnswer.mail == this.mail;
  }
}


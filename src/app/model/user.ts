export class User {
  id: string;
  login: string
  username: string;
  password: string;
  email: string;
  role: string;
  player: string;
  isAuthenticated: boolean;
  usersSet: User[];
  active: boolean;
  activationCode: string;
  index: number;
  temporaryIndex: number;

   constructor() {
  }

}


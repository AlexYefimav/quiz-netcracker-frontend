import {User} from './user';

export class Player {
  id: string;
  login: string;
  email: string;
  user: User;
  photo: string;
  isCompleted: boolean = false;

  constructor() {
  }

}

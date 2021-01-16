import {Role} from "./role";


export class User{
  id: string;
  login: string;
  username: string;
  password: string;
  mail: string;
  role: Role;
  active: number;
  player_id: number;
  manager_id: number;
  admin_id: number;
  constructor() {
  }

}


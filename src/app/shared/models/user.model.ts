import {RoleModel} from "./role.model";

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleModel;
}

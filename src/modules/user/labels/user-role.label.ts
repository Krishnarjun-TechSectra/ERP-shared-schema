import { RoleEnum } from "../enums/user-role.enum";

export const RoleLabels: Record<RoleEnum, string> = {
  [RoleEnum.EMPLOYEE]: "Employee",
  [RoleEnum.ADMIN]: "Admin",
  [RoleEnum.DEVELOPER]: "Developer",
};

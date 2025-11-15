"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleLabels = void 0;
const user_role_enum_1 = require("../enums/user-role.enum");
exports.RoleLabels = {
    [user_role_enum_1.RoleEnum.EMPLOYEE]: "Employee",
    [user_role_enum_1.RoleEnum.ADMIN]: "Admin",
    [user_role_enum_1.RoleEnum.DEVELOPER]: "Developer",
};

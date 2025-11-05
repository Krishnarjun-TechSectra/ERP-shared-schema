"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = exports.RoleSchema = exports.RoleEnum = void 0;
const zod_1 = require("zod");
/* -----------------------------------
   ENUM DEFINITIONS (human-readable)
------------------------------------*/
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["EMPLOYEE"] = "Employee";
    RoleEnum["ADMIN"] = "Admin";
    RoleEnum["DEVELOPER"] = "Developer";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
/* -----------------------------------
   ZOD SCHEMA FOR ROLE FIELD
------------------------------------*/
exports.RoleSchema = zod_1.z.enum(RoleEnum);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    role: zod_1.z.enum(RoleEnum).default(RoleEnum.EMPLOYEE),
    kpiScore: zod_1.z
        .number()
        .min(0, "The min value mus be greater than 0")
        .max(100, "The max value must be less that 100")
        .optional(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
});
/* CREATE DTO */
exports.CreateUserSchema = exports.UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
/* UPDATE DTO */
exports.UpdateUserSchema = exports.UserSchema.partial().extend({
    id: zod_1.z.string().uuid(),
});

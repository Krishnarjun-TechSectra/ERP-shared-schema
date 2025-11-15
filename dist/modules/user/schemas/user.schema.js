"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../../core/constants");
const user_role_enum_1 = require("../enums/user-role.enum");
exports.UserSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID),
    name: zod_1.z.string().min(1, constants_1.ErrorMessages.REQUIRED),
    email: zod_1.z.string().email("Invalid email"),
    role: zod_1.z.nativeEnum(user_role_enum_1.RoleEnum).default(user_role_enum_1.RoleEnum.EMPLOYEE),
    kpiScore: zod_1.z
        .number()
        .min(0, "The min value must be greater than or equal to 0")
        .max(100, "The max value must be less than or equal to 100")
        .optional(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["updatedAt"],
            message: constants_1.ErrorMessages.INVALID_TIMESTAMPS,
        });
    }
});

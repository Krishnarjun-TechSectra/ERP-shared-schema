"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.CreateUserDto = exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = exports.UserRole = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
/**
 * --------------------------------------
 * ENUMS / CONSTANTS
 * --------------------------------------
 */
exports.UserRole = {
    EMPLOYEE: "employee",
    ADMIN: "admin",
    DEVELOPER: "developer",
};
/**
 * --------------------------------------
 * BASE USER SCHEMA
 * --------------------------------------
 */
exports.UserSchema = zod_1.z.object({
    id: zod_1.z
        .string({
        error: "User ID is required",
    })
        .uuid("Invalid UUID format")
        .describe("Unique user identifier (UUID)."),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .optional()
        .describe("User's email address (optional)."),
    name: zod_1.z
        .string()
        .min(1, "Name cannot be empty")
        .max(100, "Name must be under 100 characters")
        .optional()
        .describe("Full name of the user (optional)."),
    role: zod_1.z
        .enum(exports.UserRole, {
        error: "Role is required",
    })
        .default("employee")
        .describe("Defines the user's access level."),
    created_at: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for created_at. Use ISO date string.",
    })
        .describe("Timestamp when the user was created."),
});
/**
 * --------------------------------------
 * VARIANTS FOR CREATE / UPDATE
 * --------------------------------------
 */
exports.CreateUserSchema = exports.UserSchema.omit({
    id: true,
    created_at: true,
}).extend({
    id: zod_1.z.string().uuid().optional(),
    created_at: zod_1.z.string().optional(),
});
exports.UpdateUserSchema = exports.UserSchema.partial().describe("Schema for updating user details. All fields optional.");
/**
 * --------------------------------------
 * NESTJS DTOs (for validation in controllers)
 * --------------------------------------
 */
class CreateUserDto extends (0, nestjs_zod_1.createZodDto)(exports.CreateUserSchema) {
}
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateUserSchema) {
}
exports.UpdateUserDto = UpdateUserDto;

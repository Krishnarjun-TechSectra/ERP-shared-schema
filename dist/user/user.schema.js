import { createZodDto } from "nestjs-zod";
import { z } from "zod";
/**
 * --------------------------------------
 * ENUMS / CONSTANTS
 * --------------------------------------
 */
export const UserRole = {
    EMPLOYEE: "employee",
    ADMIN: "admin",
    DEVELOPER: "developer",
};
/**
 * --------------------------------------
 * BASE USER SCHEMA
 * --------------------------------------
 */
export const UserSchema = z.object({
    id: z
        .string({
        error: "User ID is required",
    })
        .uuid("Invalid UUID format")
        .describe("Unique user identifier (UUID)."),
    email: z
        .string()
        .email("Invalid email format")
        .optional()
        .describe("User's email address (optional)."),
    name: z
        .string()
        .min(1, "Name cannot be empty")
        .max(100, "Name must be under 100 characters")
        .optional()
        .describe("Full name of the user (optional)."),
    role: z
        .enum(UserRole, {
        error: "Role is required",
    })
        .default("employee")
        .describe("Defines the user's access level."),
    created_at: z
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
export const CreateUserSchema = UserSchema.omit({
    id: true,
    created_at: true,
}).extend({
    id: z.string().uuid().optional(),
    created_at: z.string().optional(),
});
export const UpdateUserSchema = UserSchema.partial().describe("Schema for updating user details. All fields optional.");
/**
 * --------------------------------------
 * NESTJS DTOs (for validation in controllers)
 * --------------------------------------
 */
export class CreateUserDto extends createZodDto(CreateUserSchema) {
}
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {
}

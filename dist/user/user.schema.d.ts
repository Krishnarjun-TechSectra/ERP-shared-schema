import { z } from "zod";
/**
 * --------------------------------------
 * ENUMS / CONSTANTS
 * --------------------------------------
 */
export declare const UserRole: {
    readonly EMPLOYEE: "employee";
    readonly ADMIN: "admin";
    readonly DEVELOPER: "developer";
};
/**
 * --------------------------------------
 * BASE USER SCHEMA
 * --------------------------------------
 */
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<{
        employee: "employee";
        admin: "admin";
        developer: "developer";
    }>>;
    created_at: z.ZodString;
}, z.core.$strip>;
/**
 * --------------------------------------
 * VARIANTS FOR CREATE / UPDATE
 * --------------------------------------
 */
export declare const CreateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<{
        employee: "employee";
        admin: "admin";
        developer: "developer";
    }>>;
    email: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateUserSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        employee: "employee";
        admin: "admin";
        developer: "developer";
    }>>>;
    created_at: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * --------------------------------------
 * TYPES (for type safety)
 * --------------------------------------
 */
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<{
        employee: "employee";
        admin: "admin";
        developer: "developer";
    }>>;
    email: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
}, z.core.$strip>> & {
    io: "input";
};
/**
 * --------------------------------------
 * NESTJS DTOs (for validation in controllers)
 * --------------------------------------
 */
export declare class CreateUserDto extends CreateUserDto_base {
}
declare const UpdateUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        employee: "employee";
        admin: "admin";
        developer: "developer";
    }>>>;
    created_at: z.ZodOptional<z.ZodString>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};

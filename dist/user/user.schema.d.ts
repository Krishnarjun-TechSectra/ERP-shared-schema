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
        readonly EMPLOYEE: "employee";
        readonly ADMIN: "admin";
        readonly DEVELOPER: "developer";
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
        readonly EMPLOYEE: "employee";
        readonly ADMIN: "admin";
        readonly DEVELOPER: "developer";
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
        readonly EMPLOYEE: "employee";
        readonly ADMIN: "admin";
        readonly DEVELOPER: "developer";
    }>>>;
    created_at: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * --------------------------------------
 * TYPES (for type safety)
 * --------------------------------------
 */
export type User = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

import { z } from "zod";
export declare enum RoleEnum {
    EMPLOYEE = "Employee",
    ADMIN = "Admin",
    DEVELOPER = "Developer"
}
export declare const RoleSchema: z.ZodEnum<typeof RoleEnum>;
export type RoleType = z.infer<typeof RoleSchema>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<typeof RoleEnum>>;
    kpiScore: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type UserSchemaType = z.infer<typeof UserSchema>;
export declare const CreateUserSchema: z.ZodObject<{
    name: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<typeof RoleEnum>>;
    email: z.ZodString;
    kpiScore: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export declare const UpdateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof RoleEnum>>>;
    email: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    kpiScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;

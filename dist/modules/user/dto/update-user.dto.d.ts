import { z } from "zod";
export declare const UpdateUserDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof import("..").RoleEnum>>>;
    email: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    kpiScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strict>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;

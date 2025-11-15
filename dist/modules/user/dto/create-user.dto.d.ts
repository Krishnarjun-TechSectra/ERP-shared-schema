import { z } from "zod";
export declare const CreateUserDto: z.ZodObject<{
    name: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<typeof import("..").RoleEnum>>;
    email: z.ZodString;
    kpiScore: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>;
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;

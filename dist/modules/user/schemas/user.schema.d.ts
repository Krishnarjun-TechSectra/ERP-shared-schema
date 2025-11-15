import { z } from "zod";
import { RoleEnum } from "../enums/user-role.enum";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<typeof RoleEnum>>;
    kpiScore: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strict>;

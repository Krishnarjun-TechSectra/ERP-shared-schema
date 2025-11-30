import { z } from "zod";
export declare const UpdateGoalDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    progress: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    target: z.ZodOptional<z.ZodNumber>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    weightageLevel: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>;
export type UpdateGoalDtoType = z.infer<typeof UpdateGoalDto>;

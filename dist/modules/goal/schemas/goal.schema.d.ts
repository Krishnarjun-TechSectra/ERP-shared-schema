import { z } from "zod";
export declare const GoalSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    deadline: z.ZodCoercedDate<unknown>;
    weightageLevel: z.ZodNumber;
    target: z.ZodNumber;
    assignedUserId: z.ZodString;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strict>;
export type GoalSchemaType = z.infer<typeof GoalSchema>;

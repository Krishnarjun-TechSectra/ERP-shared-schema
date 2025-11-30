import { z } from "zod";
export declare const CreateGoalDto: z.ZodObject<{
    name: z.ZodString;
    target: z.ZodNumber;
    assignedUserId: z.ZodString;
    deadline: z.ZodCoercedDate<unknown>;
    weightageLevel: z.ZodNumber;
}, z.core.$strict>;
export type CreateGoalDtoType = z.infer<typeof CreateGoalDto>;

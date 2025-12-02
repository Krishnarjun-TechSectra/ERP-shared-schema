import { z } from "zod";
import { ViewTypeEnum } from "../../task";
export declare const GoalFilterSchema: z.ZodObject<{
    assignedUserId: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<typeof ViewTypeEnum>>;
    selectedDate: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;

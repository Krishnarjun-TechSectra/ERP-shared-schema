import { z } from "zod";
export declare const GoalFilterDto: z.ZodObject<{
    assignedUserId: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<typeof import("../../task").ViewTypeEnum>>;
    selectedDate: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type GoalFilterDtoType = z.infer<typeof GoalFilterDto>;

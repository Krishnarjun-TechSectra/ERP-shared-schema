import { z } from "zod";
export declare const TaskFilterDto: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<typeof import("..").TaskStatusEnum>>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<typeof import("..").ViewTypeEnum>>;
    selectedDate: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type TaskFilterDtoType = z.infer<typeof TaskFilterDto>;

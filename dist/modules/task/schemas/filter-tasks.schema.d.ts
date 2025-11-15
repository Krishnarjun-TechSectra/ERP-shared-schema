import { z } from "zod";
import { TaskStatusEnum } from "../enums";
import { ViewTypeEnum } from "../enums";
export declare const TaskFilterSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<typeof TaskStatusEnum>>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<typeof ViewTypeEnum>>;
    selectedDate: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;

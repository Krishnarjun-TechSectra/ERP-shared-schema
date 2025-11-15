import z from "zod";
import { TaskStatusEnum } from "./task.enum";
export declare const TaskInstanceSchema: z.ZodObject<{
    id: z.ZodString;
    taskMasterId: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>;
    deadline: z.ZodCoercedDate<unknown>;
    completionDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    proofOfCompletion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;

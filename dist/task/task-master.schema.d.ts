import z from "zod";
import { RecurringFrequencyEnum, TaskPriorityEnum } from "./task.enum";
export declare const TaskMasterSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>;
    recurringEndDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    assignedUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof import("../user").RoleEnum>>>;
        kpiScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
        updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    }, z.core.$strip>>;
    kpiId: z.ZodOptional<z.ZodString>;
    kpi: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        colorCode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;

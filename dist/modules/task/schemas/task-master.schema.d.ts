import { z } from "zod";
import { WeekdayEnum } from "../../../core/enums/weekday.enum";
import { RecurringFrequencyEnum, TaskPriorityEnum } from "../enums";
export declare const TaskMasterSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>;
    recurringEndDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    recurringWeekDays: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<typeof WeekdayEnum>>>>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    assignedUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof import("../../user").RoleEnum>>>;
        kpiScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
        updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    }, z.core.$strict>>;
    kpiId: z.ZodOptional<z.ZodString>;
    kpi: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        colorCode: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
        updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    }, z.core.$strict>>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strict>;

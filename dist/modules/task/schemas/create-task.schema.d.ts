import { z } from "zod";
import { TaskPriorityEnum, TaskStatusEnum, RecurringFrequencyEnum } from "../enums";
import { WeekdayEnum } from "../../../core/enums";
export declare const CreateTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>;
    recurringEndDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    recurringWeekDays: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<typeof WeekdayEnum>>>>;
    assignedUserId: z.ZodString;
    kpiId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    status: z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>;
    completionDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    proofOfCompletion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;

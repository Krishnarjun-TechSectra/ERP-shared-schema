import { z } from "zod";
export declare const CreateTaskDto: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<typeof import("..").TaskPriorityEnum>>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof import("..").RecurringFrequencyEnum>>>;
    recurringEndDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    recurringWeekDays: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<typeof import("../../..").WeekdayEnum>>>>;
    assignedUserId: z.ZodString;
    kpiId: z.ZodOptional<z.ZodString>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    status: z.ZodDefault<z.ZodEnum<typeof import("..").TaskStatusEnum>>;
    completionDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    proofOfCompletion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export type CreateTaskDtoType = z.infer<typeof CreateTaskDto>;

import { z } from 'zod';
export declare enum TaskPriorityEnum {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High"
}
export declare enum TaskStatusEnum {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}
export declare enum RecurringFrequencyEnum {
    DAILY = "Daily",
    WEEKLY = "Weekly",
    MONTHLY = "Monthly",
    YEARLY = "Yearly"
}
export declare enum ViewTypeEnum {
    DAILY = "Daily",
    WEEKLY = "Weekly",
    MONTHLY = "Monthly",
    YEARLY = "Yearly"
}
export declare const TaskSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>;
    deadline: z.ZodCoercedDate<unknown>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>>;
    status: z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>;
    proofOfCompletion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    kpiId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type TaskSchemaType = z.infer<typeof TaskSchema>;
export declare const CreateTaskSchema: z.ZodObject<{
    priority: z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>;
    deadline: z.ZodCoercedDate<unknown>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>>;
    proofOfCompletion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    assignedUserId: z.ZodString;
    kpiId: z.ZodString;
}, z.core.$strip>;
export type CreateTaskDTO = z.infer<typeof CreateTaskSchema>;
export declare const UpdateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    isRecurring: z.ZodOptional<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>>;
    proofOfCompletion: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    assignedUserId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kpiId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    id: z.ZodString;
}, z.core.$strip>;
export type UpdateTaskDTO = z.infer<typeof UpdateTaskSchema>;
export declare const TaskFilterSchema: z.ZodObject<{
    assignedUserId: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<typeof ViewTypeEnum>>;
    date: z.ZodOptional<z.ZodString>;
    month: z.ZodOptional<z.ZodNumber>;
    year: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Notes:
 * - `assignedUserId`: filter tasks assigned to a specific user
 * - `viewType`: determines the time period to filter (daily, weekly, monthly, yearly)
 * - You can derive `startDate` and `endDate` based on `viewType` in service logic
 */
export type TaskFilterDTO = z.infer<typeof TaskFilterSchema>;

import { z } from "zod";
export declare enum TaskPriorityEnum {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High"
}
export declare enum TaskStatusEnum {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
    OVERDUE = "Overdue"
}
export declare enum RecurringFrequencyEnum {
    DAILY = "Daily",
    WEEKLY = "Weekly"
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
    recurringFrequency: z.ZodNullable<z.ZodOptional<z.ZodEnum<typeof RecurringFrequencyEnum>>>;
    status: z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>;
    proofOfCompletion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
export type TaskSchemaType = z.infer<typeof TaskSchema>;
export declare const CreateTaskSchema: z.ZodObject<{
    priority: z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>;
    deadline: z.ZodCoercedDate<unknown>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodNullable<z.ZodOptional<z.ZodEnum<typeof RecurringFrequencyEnum>>>;
    proofOfCompletion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    assignedUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof import("../user").RoleEnum>>>;
        kpiScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
        updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    }, z.core.$strip>>;
    kpi: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        colorCode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    title: z.ZodString;
    assignedUserId: z.ZodString;
    kpiId: z.ZodString;
}, z.core.$strip>;
export type CreateTaskDTO = z.infer<typeof CreateTaskSchema>;
export declare const UpdateTaskSchema: z.ZodObject<{
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    isRecurring: z.ZodOptional<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodEnum<typeof RecurringFrequencyEnum>>>>;
    proofOfCompletion: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    assignedUserId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assignedUser: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof import("../user").RoleEnum>>>;
        kpiScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
        updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    }, z.core.$strip>>>;
    kpiId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kpi: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        colorCode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type UpdateTaskDTO = z.infer<typeof UpdateTaskSchema>;
export declare const TaskFilterSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<typeof TaskStatusEnum>>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<typeof ViewTypeEnum>>;
    selectedDate: z.ZodString;
}, z.core.$strip>;
export type TaskFilterDTO = z.infer<typeof TaskFilterSchema>;

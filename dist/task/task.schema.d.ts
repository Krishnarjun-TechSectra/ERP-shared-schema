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
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    YEARLY = "yearly"
}
export declare const TaskMasterSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>;
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
export type TaskMasterSchemaType = z.infer<typeof TaskMasterSchema>;
export declare const CreateTaskMasterSchema: z.ZodObject<{
    priority: z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>;
    description: z.ZodOptional<z.ZodString>;
    isRecurring: z.ZodBoolean;
    recurringFrequency: z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>;
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
export type CreateTaskMasterDTO = z.infer<typeof CreateTaskMasterSchema>;
export declare const UpdateTaskMasterSchema: z.ZodObject<{
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof TaskPriorityEnum>>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    isRecurring: z.ZodOptional<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>>;
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
export type UpdateTaskMasterDTO = z.infer<typeof UpdateTaskMasterSchema>;
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
export type TaskInstanceSchemaType = z.infer<typeof TaskInstanceSchema>;
export declare const CreateTaskInstanceSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<typeof TaskStatusEnum>>;
    taskMasterId: z.ZodString;
    deadline: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export type CreateTaskDTO = z.infer<typeof CreateTaskInstanceSchema>;
export declare const UpdateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<typeof TaskPriorityEnum>>;
    isRecurring: z.ZodOptional<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof RecurringFrequencyEnum>>>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    kpiId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<typeof TaskStatusEnum>>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    completionDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    proofOfCompletion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type UpdateTaskDTO = z.infer<typeof UpdateTaskSchema>;
export declare const TaskFilterSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<typeof TaskStatusEnum>>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<typeof ViewTypeEnum>>;
    selectedDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type TaskFilterDTO = z.infer<typeof TaskFilterSchema>;

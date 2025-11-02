import { z } from 'zod/v4';
/**
 * -------------------------------
 * ENUM DEFINITIONS
 * -------------------------------
 */
export declare const TaskPriority: {
    readonly LOW: "low";
    readonly MEDIUM: "medium";
    readonly HIGH: "high";
};
export declare const RecurringFrequency: {
    readonly DAILY: "daily";
    readonly WEEKLY: "weekly";
    readonly NIL: "";
};
export declare const TaskStatus: {
    readonly TODO: "to_do";
    readonly IN_PROGRESS: "in_progress";
    readonly OVERDUE: "overdue";
    readonly COMPLETED: "completed";
};
/**
 * -------------------------------
 * CONDITIONAL VALIDATION
 * -------------------------------
 */
export declare const TaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    kpi_id: z.ZodOptional<z.ZodString>;
    assignTo: z.ZodString;
    priority: z.ZodEnum<{
        readonly LOW: "low";
        readonly MEDIUM: "medium";
        readonly HIGH: "high";
    }>;
    deadline: z.ZodString;
    isRecurring: z.ZodDefault<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodEnum<{
        readonly DAILY: "daily";
        readonly WEEKLY: "weekly";
        readonly NIL: "";
    }>>;
    status: z.ZodDefault<z.ZodEnum<{
        readonly TODO: "to_do";
        readonly IN_PROGRESS: "in_progress";
        readonly OVERDUE: "overdue";
        readonly COMPLETED: "completed";
    }>>;
    proof_of_complete: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * -------------------------------
 * VARIANTS FOR CREATE / UPDATE
 * -------------------------------
 */
export declare const CreateTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    kpi_id: z.ZodOptional<z.ZodString>;
    assignTo: z.ZodString;
    priority: z.ZodEnum<{
        readonly LOW: "low";
        readonly MEDIUM: "medium";
        readonly HIGH: "high";
    }>;
    deadline: z.ZodString;
    isRecurring: z.ZodDefault<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodEnum<{
        readonly DAILY: "daily";
        readonly WEEKLY: "weekly";
        readonly NIL: "";
    }>>;
    proof_of_complete: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        readonly TODO: "to_do";
        readonly IN_PROGRESS: "in_progress";
        readonly OVERDUE: "overdue";
        readonly COMPLETED: "completed";
    }>>;
}, z.core.$strip>;
export declare const UpdateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kpi_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assignTo: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<{
        readonly LOW: "low";
        readonly MEDIUM: "medium";
        readonly HIGH: "high";
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
    isRecurring: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    recurringFrequency: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        readonly DAILY: "daily";
        readonly WEEKLY: "weekly";
        readonly NIL: "";
    }>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        readonly TODO: "to_do";
        readonly IN_PROGRESS: "in_progress";
        readonly OVERDUE: "overdue";
        readonly COMPLETED: "completed";
    }>>>;
    proof_of_complete: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * -------------------------------
 * TYPES (for TypeScript safety)
 * -------------------------------
 */
export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
declare const CreateTaskDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    kpi_id: z.ZodOptional<z.ZodString>;
    assignTo: z.ZodString;
    priority: z.ZodEnum<{
        readonly LOW: "low";
        readonly MEDIUM: "medium";
        readonly HIGH: "high";
    }>;
    deadline: z.ZodString;
    isRecurring: z.ZodDefault<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodEnum<{
        readonly DAILY: "daily";
        readonly WEEKLY: "weekly";
        readonly NIL: "";
    }>>;
    proof_of_complete: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        readonly TODO: "to_do";
        readonly IN_PROGRESS: "in_progress";
        readonly OVERDUE: "overdue";
        readonly COMPLETED: "completed";
    }>>;
}, z.core.$strip>> & {
    io: "input";
};
/**
 * -------------------------------
 * NESTJS DTOs (for Controllers)
 * -------------------------------
 */
export declare class CreateTaskDto extends CreateTaskDto_base {
}
declare const UpdateTaskDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kpi_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assignTo: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<{
        readonly LOW: "low";
        readonly MEDIUM: "medium";
        readonly HIGH: "high";
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
    isRecurring: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    recurringFrequency: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        readonly DAILY: "daily";
        readonly WEEKLY: "weekly";
        readonly NIL: "";
    }>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        readonly TODO: "to_do";
        readonly IN_PROGRESS: "in_progress";
        readonly OVERDUE: "overdue";
        readonly COMPLETED: "completed";
    }>>>;
    proof_of_complete: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class UpdateTaskDto extends UpdateTaskDto_base {
}
export {};

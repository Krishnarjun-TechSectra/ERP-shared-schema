import { z } from 'zod/v4';
/**
 * -------------------------------
 * ENUM DEFINITIONS
 * -------------------------------
 */
export declare const TaskPriority: z.ZodEnum<{
    high: "high";
    low: "low";
    medium: "medium";
}>;
export declare const RecurringFrequency: z.ZodEnum<{
    "": "";
    daily: "daily";
    weekly: "weekly";
}>;
export declare const TaskStatus: z.ZodEnum<{
    completed: "completed";
    to_do: "to_do";
    in_progress: "in_progress";
    overdue: "overdue";
}>;
/**
 * -------------------------------
 * CONDITIONAL VALIDATION
 * -------------------------------
 */
export declare const TaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    kpiId: z.ZodOptional<z.ZodString>;
    assignedTo: z.ZodOptional<z.ZodString>;
    assignedUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    priority: z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        completed: "completed";
        to_do: "to_do";
        in_progress: "in_progress";
        overdue: "overdue";
    }>>;
    isRecurring: z.ZodDefault<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodEnum<{
        "": "";
        daily: "daily";
        weekly: "weekly";
    }>>;
    proofOfCompletion: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * -------------------------------
 * CREATE / UPDATE VARIANTS
 * -------------------------------
 */
export declare const CreateTaskSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    assignedUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    priority: z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
    isRecurring: z.ZodDefault<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodEnum<{
        "": "";
        daily: "daily";
        weekly: "weekly";
    }>>;
    proofOfCompletion: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    assignedTo: z.ZodString;
    kpiId: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        completed: "completed";
        to_do: "to_do";
        in_progress: "in_progress";
        overdue: "overdue";
    }>>;
}, z.core.$strip>;
export declare const UpdateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kpiId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assignedTo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assignedUser: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
    }>>>;
    deadline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        completed: "completed";
        to_do: "to_do";
        in_progress: "in_progress";
        overdue: "overdue";
    }>>>;
    isRecurring: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    recurringFrequency: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        "": "";
        daily: "daily";
        weekly: "weekly";
    }>>>;
    proofOfCompletion: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * -------------------------------
 * TYPES (for TS safety)
 * -------------------------------
 */
export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
declare const CreateTaskDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    assignedUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    priority: z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
    isRecurring: z.ZodDefault<z.ZodBoolean>;
    recurringFrequency: z.ZodOptional<z.ZodEnum<{
        "": "";
        daily: "daily";
        weekly: "weekly";
    }>>;
    proofOfCompletion: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    assignedTo: z.ZodString;
    kpiId: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        completed: "completed";
        to_do: "to_do";
        in_progress: "in_progress";
        overdue: "overdue";
    }>>;
}, z.core.$strip>> & {
    io: "input";
};
/**
 * -------------------------------
 * NESTJS DTO CLASSES
 * -------------------------------
 */
export declare class CreateTaskDto extends CreateTaskDto_base {
}
declare const UpdateTaskDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kpiId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assignedTo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assignedUser: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
    }>>>;
    deadline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        completed: "completed";
        to_do: "to_do";
        in_progress: "in_progress";
        overdue: "overdue";
    }>>>;
    isRecurring: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    recurringFrequency: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        "": "";
        daily: "daily";
        weekly: "weekly";
    }>>>;
    proofOfCompletion: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class UpdateTaskDto extends UpdateTaskDto_base {
}
export {};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDto = exports.CreateTaskDto = exports.UpdateTaskSchema = exports.CreateTaskSchema = exports.TaskSchema = exports.TaskStatus = exports.RecurringFrequency = exports.TaskPriority = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const v4_1 = require("zod/v4");
/**
 * -------------------------------
 * ENUM DEFINITIONS
 * -------------------------------
 */
exports.TaskPriority = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
};
exports.RecurringFrequency = {
    DAILY: "daily",
    WEEKLY: "weekly",
    NIL: "",
};
exports.TaskStatus = {
    TODO: "to_do",
    IN_PROGRESS: "in_progress",
    OVERDUE: "overdue",
    COMPLETED: "completed",
};
/**
 * -------------------------------
 * BASE SCHEMA
 * -------------------------------
 */
const TaskBaseSchema = v4_1.z.object({
    title: v4_1.z
        .string({ error: "Title is required" })
        .min(1, "Title cannot be empty")
        .max(100, "Title must be under 100 characters"),
    description: v4_1.z.string().max(1000, "Description too long").optional(),
    kpi_id: v4_1.z.string().uuid("Invalid KPI ID format").optional(),
    assignTo: v4_1.z
        .string({ error: "Assignee is required" })
        .uuid("Invalid user ID format"),
    assignToUser: v4_1.z
        .object({
        id: v4_1.z.string().uuid(),
        name: v4_1.z.string().optional(),
        email: v4_1.z.string().email().optional(),
    })
        .optional(),
    priority: v4_1.z.enum(exports.TaskPriority, { error: "Priority is required" }),
    deadline: v4_1.z
        .string({ error: "Deadline is required" })
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid deadline format. Use ISO 8601 date string.",
    }),
    isRecurring: v4_1.z.boolean().default(false),
    recurringFrequency: v4_1.z
        .enum(exports.RecurringFrequency, {
        error: "Recurring frequency must be specified",
    })
        .optional(),
    status: v4_1.z.enum(exports.TaskStatus).default(exports.TaskStatus.TODO),
    proofOdfComplete: v4_1.z.string().optional(),
});
/**
 * -------------------------------
 * CONDITIONAL VALIDATION
 * -------------------------------
 */
exports.TaskSchema = TaskBaseSchema.superRefine((data, ctx) => {
    if (data.status === exports.TaskStatus.COMPLETED && !data.proofOdfComplete) {
        ctx.addIssue({
            code: "custom",
            message: "Proof of completion is required when status is completed.",
            path: ["proofOdfComplete"],
        });
    }
});
/**
 * -------------------------------
 * VARIANTS FOR CREATE / UPDATE
 * -------------------------------
 */
exports.CreateTaskSchema = exports.TaskSchema.safeExtend({
    status: v4_1.z.enum(exports.TaskStatus).default(exports.TaskStatus.TODO),
});
exports.UpdateTaskSchema = exports.TaskSchema.partial();
/**
 * -------------------------------
 * NESTJS DTOs (for Controllers)
 * -------------------------------
 */
class CreateTaskDto extends (0, nestjs_zod_1.createZodDto)(exports.CreateTaskSchema) {
}
exports.CreateTaskDto = CreateTaskDto;
class UpdateTaskDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateTaskSchema) {
}
exports.UpdateTaskDto = UpdateTaskDto;

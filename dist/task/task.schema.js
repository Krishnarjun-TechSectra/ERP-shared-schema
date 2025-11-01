import { z } from "zod/v4";
/**
 * -------------------------------
 * ENUM DEFINITIONS
 * -------------------------------
 */
export const TaskPriority = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
};
export const RecurringFrequency = {
    DAILY: "daily",
    WEEKLY: "weekly",
    NIL: "",
};
export const TaskStatus = {
    TODO: "to_do",
    IN_PROGRESS: "in_progress",
    OVERDUE: "overdue",
    COMPLETED: "completed",
};
/**
 * -------------------------------
 * BASE SCHEMA
 * -------------------------------
 * Uses .enum() and .uuid() replacements with modern Zod patterns.
 */
const TaskBaseSchema = z.object({
    title: z
        .string({
        error: "Title is required",
    })
        .min(1, "Title cannot be empty")
        .max(100, "Title must be under 100 characters")
        .describe("Enter a concise, descriptive title for the task."),
    description: z
        .string()
        .max(1000, "Description too long")
        .optional()
        .describe("Detailed explanation or notes about the task."),
    kpi_id: z
        .string()
        .uuid("Invalid KPI ID format")
        .optional()
        .describe("Associated KPI reference ID (optional)."),
    assignTo: z
        .string({
        error: "Assignee is required",
    })
        .uuid("Invalid user ID format")
        .describe("UUID of the user assigned to this task."),
    priority: z
        .enum(TaskPriority, {
        error: "Priority is required",
    })
        .describe("Set task priority: low, medium, or high."),
    deadline: z
        .string({
        error: "Deadline is required",
    })
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid deadline format. Use ISO 8601 date string.",
    })
        .describe("Task deadline in ISO 8601 format (e.g., 2025-11-03T00:00:00Z)."),
    isRecurring: z
        .boolean()
        .default(false)
        .describe("Whether this task repeats over time."),
    recurringFrequency: z
        .enum(RecurringFrequency, {
        error: "Recurring frequency must be specified when recurring",
    })
        .optional()
        .describe("If recurring, specify repetition interval (daily, weekly, or none)."),
    status: z
        .enum(TaskStatus)
        .default("to_do")
        .describe("Current progress status of the task."),
    proof_of_complete: z
        .string()
        .optional()
        .describe("Provide a valid URL or file link as proof of completion."),
});
/**
 * -------------------------------
 * CONDITIONAL VALIDATION
 * -------------------------------
 * Proof required if status = COMPLETED
 */
export const TaskSchema = TaskBaseSchema.superRefine((data, ctx) => {
    if (data.status === "completed" && !data.proof_of_complete) {
        const customIssue = {
            code: "custom",
            message: "Proof of completion is required when status is completed.",
            path: ["proof_of_complete"],
            input: undefined,
        };
        ctx.issues.push(customIssue);
    }
});
/**
 * -------------------------------
 * VARIANTS FOR CREATE / UPDATE
 * -------------------------------
 */
export const CreateTaskSchema = TaskSchema.extend({
    status: z
        .enum(["to_do", "in_progress", "overdue", "completed"])
        .default("to_do")
        .describe("Initial task status (default: to_do)."),
});
export const UpdateTaskSchema = TaskSchema.partial().describe("Schema for updating an existing task. All fields optional.");

import { createZodDto } from "nestjs-zod";
import { z } from "zod/v4";

/**
 * ENUM DEFINITIONS (same as before)
 */
export const TaskPriority = z.enum(["low", "medium", "high"]);
export const RecurringFrequency = z.enum(["daily", "weekly", ""]);
export const TaskStatus = z.enum([
  "to_do",
  "in_progress",
  "completed",
  "overdue",
]);

/**
 * BASE SCHEMA
 */
const TaskBaseSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, "Title cannot be empty")
    .max(150, "Title must be under 150 characters"),
  description: z.string().max(1000, "Description too long").optional(),
  kpiId: z.string().uuid("Invalid KPI ID format").optional(),
  assignedTo: z.string().uuid("Invalid User ID format").optional(), // Input user id!
  // assignedUser is for output population only
  assignedUser: z
    .object({
      id: z.string().uuid(),
      name: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
  priority: TaskPriority.default("medium"),
  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format. Use ISO 8601 string.",
    })
    .optional(),
  status: TaskStatus.default("to_do"),
  isRecurring: z.boolean().default(false),
  recurringFrequency: RecurringFrequency.optional(),
  proofOfCompletion: z.string().optional(),
});

/**
 * CONDITIONAL VALIDATION
 */
export const TaskSchema = TaskBaseSchema.superRefine((data, ctx) => {
  if (data.status === "completed" && !data.proofOfCompletion) {
    ctx.addIssue({
      code: "custom",
      message: "Proof of completion is required when status is completed.",
      path: ["proofOfCompletion"],
    });
  }
});

/**
 * CREATE / UPDATE VARIANTS
 */
export const CreateTaskSchema = TaskSchema.safeExtend({
  title: z.string().min(1, "Title is required"),
  assignedTo: z
    .string()
    .min(1, "Assigned User is Required")
    .uuid("Invalid User ID format"),
  kpiId: z.string().uuid("Invalid KPI ID format").optional(),
  status: TaskStatus.default("to_do"),
});

export const UpdateTaskSchema = TaskSchema.partial();

/**
 * TYPES (for TS safety)
 */
export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

/**
 * NESTJS DTO CLASSES
 */
export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}
export class UpdateTaskDto extends createZodDto(UpdateTaskSchema) {}

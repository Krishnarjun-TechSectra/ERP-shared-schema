import { createZodDto } from "nestjs-zod";
import { z } from "zod/v4";

// Enum as const
export const ViewTypeEnum = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
} as const;

// Create a Zod enum from object values
export const ViewTypeZod = z.enum(Object.values(ViewTypeEnum) as [string, ...string[]]);

// Schema definition
export const TaskFilterSchema = z.object({
  assignedTo: z
    .string()
    .uuid("Invalid user ID format")
    .optional()
    .describe("Filter tasks assigned to a specific user (UUID)."),

  viewType: ViewTypeZod
    .optional()
    .describe("Filter by calendar view: daily, weekly, monthly, or yearly."),

  deadline: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Deadline must be a valid ISO date string",
    })
    .describe("Filter tasks by deadline date (ISO 8601 format)."),
});

// Types and DTO class
export type TaskFilter = z.infer<typeof TaskFilterSchema>;
export class TaskFilterDto extends createZodDto(TaskFilterSchema) {}

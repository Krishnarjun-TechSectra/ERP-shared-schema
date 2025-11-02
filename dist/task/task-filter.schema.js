import { z } from "zod/v4";
export const ViewType = {
    DAILY: "daily",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    YEARLY: "yearly",
};
export const TaskFilterSchema = z.object({
    assignTo: z
        .string()
        .uuid("Invalid user ID format")
        .optional()
        .describe("Filter tasks assigned to a specific user (UUID)."),
    viewType: z
        .nativeEnum(ViewType)
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

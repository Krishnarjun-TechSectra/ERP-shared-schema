"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFilterDto = exports.TaskFilterSchema = exports.ViewTypeZod = exports.ViewTypeEnum = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const v4_1 = require("zod/v4");
// Enum as const
exports.ViewTypeEnum = {
    DAILY: "daily",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    YEARLY: "yearly",
};
// Create a Zod enum from object values
exports.ViewTypeZod = v4_1.z.enum(Object.values(exports.ViewTypeEnum));
// Schema definition
exports.TaskFilterSchema = v4_1.z.object({
    assignedTo: v4_1.z
        .string()
        .uuid("Invalid user ID format")
        .optional()
        .describe("Filter tasks assigned to a specific user (UUID)."),
    viewType: exports.ViewTypeZod
        .optional()
        .describe("Filter by calendar view: daily, weekly, monthly, or yearly."),
    deadline: v4_1.z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Deadline must be a valid ISO date string",
    })
        .describe("Filter tasks by deadline date (ISO 8601 format)."),
});
class TaskFilterDto extends (0, nestjs_zod_1.createZodDto)(exports.TaskFilterSchema) {
}
exports.TaskFilterDto = TaskFilterDto;

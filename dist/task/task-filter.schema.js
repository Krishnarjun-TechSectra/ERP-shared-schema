"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFilterDto = exports.TaskFilterSchema = exports.ViewType = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const v4_1 = require("zod/v4");
exports.ViewType = {
    DAILY: "daily",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    YEARLY: "yearly",
};
exports.TaskFilterSchema = v4_1.z.object({
    assignTo: v4_1.z
        .string()
        .uuid("Invalid user ID format")
        .optional()
        .describe("Filter tasks assigned to a specific user (UUID)."),
    viewType: v4_1.z
        .nativeEnum(exports.ViewType)
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

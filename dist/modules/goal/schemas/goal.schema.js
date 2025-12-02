"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../../core/constants");
exports.GoalSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID).optional(),
    // 1. Goal Name (Sales)
    name: zod_1.z
        .string()
        .min(1, constants_1.ErrorMessages.REQUIRED),
    // 2. Deadline (20 Dec)
    deadline: zod_1.z.coerce.date(),
    // 3. Weightage Level (Level 1–5)
    weightageLevel: zod_1.z
        .number()
        .int()
        .min(1, "Weightage level must be at least 1")
        .max(5, "Weightage level must be at most 5"),
    target: zod_1.z
        .string()
        .min(0, "Goal Target is required"),
    // 5. Assigned user
    assignedUserId: zod_1.z
        .string()
        .uuid(constants_1.ErrorMessages.INVALID_UUID),
    // NEW: progress % (for slider)
    progress: zod_1.z
        .number()
        .int()
        .min(0, "Progress cannot be less than 0")
        .max(100, "Progress cannot be more than 100")
        .default(0),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    // same logic as KPI for timestamps
    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["updatedAt"],
            message: constants_1.ErrorMessages.INVALID_TIMESTAMPS,
        });
    }
});

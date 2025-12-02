"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalFilterSchema = void 0;
const zod_1 = require("zod");
const task_1 = require("../../task");
const constants_1 = require("../../../core/constants");
exports.GoalFilterSchema = zod_1.z
    .object({
    assignedUserId: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID).optional(),
    viewType: zod_1.z.nativeEnum(task_1.ViewTypeEnum).optional(),
    // Selected date (string for flexibility; FE will send YYYY-MM-DD or ISO)
    selectedDate: zod_1.z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), constants_1.ErrorMessages.INVALID_DATE),
})
    .strict()
    .superRefine((data, ctx) => {
    /* ------------------------------------------------------
       Rule:
       selectedDate is required when viewType is provided
    -------------------------------------------------------*/
    if (data.viewType && !data.selectedDate) {
        ctx.addIssue({
            path: ["selectedDate"],
            code: zod_1.z.ZodIssueCode.custom,
            message: "selectedDate is required when viewType is provided",
        });
    }
    /* ------------------------------------------------------
       selectedDate cannot be an invalid date
    -------------------------------------------------------*/
    if (data.selectedDate && isNaN(Date.parse(data.selectedDate))) {
        ctx.addIssue({
            path: ["selectedDate"],
            code: zod_1.z.ZodIssueCode.custom,
            message: constants_1.ErrorMessages.INVALID_DATE,
        });
    }
});

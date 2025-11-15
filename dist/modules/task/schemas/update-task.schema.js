"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../enums");
const constants_1 = require("../../../core/constants");
const enums_2 = require("../../../core/enums");
exports.UpdateTaskSchema = zod_1.z
    .object({
    /* ---------------- MASTER FIELDS ---------------- */
    title: zod_1.z
        .string()
        .min(1, constants_1.ErrorMessages.REQUIRED)
        .max(200, constants_1.ErrorMessages.TITLE_TOO_LONG)
        .optional(),
    description: zod_1.z
        .string()
        .max(2000, constants_1.ErrorMessages.DESCRIPTION_TOO_LONG)
        .optional(),
    priority: zod_1.z.nativeEnum(enums_1.TaskPriorityEnum).optional(),
    isRecurring: zod_1.z.boolean().optional(),
    recurringFrequency: zod_1.z
        .nativeEnum(enums_1.RecurringFrequencyEnum)
        .nullable()
        .optional(),
    recurringEndDate: zod_1.z.coerce
        .date({ error: constants_1.ErrorMessages.INVALID_DATE })
        .nullable()
        .optional(),
    recurringWeekDays: zod_1.z.array(zod_1.z.nativeEnum(enums_2.WeekdayEnum)).nullable().optional(),
    assignedUserId: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID).optional(),
    kpiId: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID).optional(),
    /* ---------------- INSTANCE FIELDS ---------------- */
    deadline: zod_1.z.coerce.date().optional(),
    status: zod_1.z.nativeEnum(enums_1.TaskStatusEnum).optional(),
    completionDate: zod_1.z.coerce.date().nullable().optional(),
    proofOfCompletion: zod_1.z.string().nullable().optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    /* ------------------------------------------------------
       VALIDATE UPDATE LOGIC
       We must check what fields exist in the payload.
    -------------------------------------------------------*/
    /* ===========================================================
       IF isRecurring is explicitly set to FALSE
       → Clear / Disallow recurring fields
    =========================================================== */
    if (data.isRecurring === false) {
        if (data.recurringFrequency ||
            data.recurringEndDate ||
            data.recurringWeekDays) {
            ctx.addIssue({
                path: ["isRecurring"],
                message: constants_1.ErrorMessages.RECURRING_FIELDS_INVALID,
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
        // For non-recurring tasks → deadline MUST be allowed
        return;
    }
    /* ===========================================================
       IF isRecurring is TRUE (or recurring fields are present)
       → Apply recurring rules
    =========================================================== */
    const recurringMode = data.isRecurring === true ||
        data.recurringFrequency !== undefined ||
        data.recurringEndDate !== undefined ||
        data.recurringWeekDays !== undefined;
    if (recurringMode) {
        // 1. frequency required if provided
        if (!data.recurringFrequency) {
            ctx.addIssue({
                path: ["recurringFrequency"],
                message: constants_1.ErrorMessages.RECURRING_FREQUENCY_REQUIRED,
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
        // 2. end date required
        if (!data.recurringEndDate) {
            ctx.addIssue({
                path: ["recurringEndDate"],
                message: "Recurring tasks must have an end date",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
        // DAILY rules
        if (data.recurringFrequency === enums_1.RecurringFrequencyEnum.DAILY) {
            if (data.recurringWeekDays) {
                ctx.addIssue({
                    path: ["recurringWeekDays"],
                    message: "recurringWeekDays must not be provided for DAILY recurring tasks",
                    code: zod_1.z.ZodIssueCode.custom,
                });
            }
        }
        // WEEKLY rules
        if (data.recurringFrequency === enums_1.RecurringFrequencyEnum.WEEKLY) {
            if (!data.recurringWeekDays || data.recurringWeekDays.length === 0) {
                ctx.addIssue({
                    path: ["recurringWeekDays"],
                    message: "You must select at least one weekday for WEEKLY recurring tasks",
                    code: zod_1.z.ZodIssueCode.custom,
                });
            }
        }
        // recurring task cannot accept deadline
        if (data.deadline) {
            ctx.addIssue({
                path: ["deadline"],
                message: "Deadline must not be provided for recurring tasks. It will be auto-generated.",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
    }
    /* ===========================================================
       NON-RECURRING UPDATE
       If isRecurring is NOT touched and recurring fields not present
       → No extra rules (partial update allowed)
    =========================================================== */
    /* ===========================================================
       Validation: completionDate must not exceed deadline
    =========================================================== */
    if (data.completionDate && data.deadline) {
        if (data.completionDate > data.deadline) {
            ctx.addIssue({
                path: ["completionDate"],
                message: "Completion date cannot be after the deadline",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
    }
});

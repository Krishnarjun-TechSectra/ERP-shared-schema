"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../enums");
const enums_2 = require("../../../core/enums");
const constants_1 = require("../../../core/constants");
exports.CreateTaskSchema = zod_1.z
    .object({
    /* ---------------- MASTER FIELDS ---------------- */
    title: zod_1.z
        .string()
        .min(1, constants_1.ErrorMessages.REQUIRED)
        .max(200, constants_1.ErrorMessages.TITLE_TOO_LONG),
    description: zod_1.z
        .string()
        .max(2000, constants_1.ErrorMessages.DESCRIPTION_TOO_LONG)
        .optional(),
    priority: zod_1.z.nativeEnum(enums_1.TaskPriorityEnum).default(enums_1.TaskPriorityEnum.MEDIUM),
    isRecurring: zod_1.z.boolean(),
    recurringFrequency: zod_1.z
        .nativeEnum(enums_1.RecurringFrequencyEnum)
        .nullable()
        .optional(),
    recurringEndDate: zod_1.z.coerce
        .date({ error: constants_1.ErrorMessages.INVALID_DATE })
        .nullable()
        .optional(),
    recurringWeekDays: zod_1.z.array(zod_1.z.nativeEnum(enums_2.WeekdayEnum)).nullable().optional(),
    assignedUserId: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID),
    kpiId: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID).optional().nullable(),
    /* ---------------- INSTANCE FIELDS ---------------- */
    // ❗ For non-recurring tasks FE must send deadline
    // ❗ For recurring tasks FE must NOT send deadline
    deadline: zod_1.z.coerce.date().optional(),
    status: zod_1.z.nativeEnum(enums_1.TaskStatusEnum).default(enums_1.TaskStatusEnum.TODO),
    completionDate: zod_1.z.coerce.date().nullable().optional(),
    proofOfCompletion: zod_1.z.string().nullable().optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    /* ===========================================================
       NON-RECURRING TASK LOGIC
    =========================================================== */
    if (!data.isRecurring) {
        if (data.recurringFrequency ||
            data.recurringEndDate ||
            data.recurringWeekDays) {
            ctx.addIssue({
                path: ["isRecurring"],
                message: constants_1.ErrorMessages.RECURRING_FIELDS_INVALID,
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
        // deadline REQUIRED for non-recurring tasks
        if (!data.deadline) {
            ctx.addIssue({
                path: ["deadline"],
                message: "Deadline is required for non-recurring tasks",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
        return; // non-recurring logic finished
    }
    /* ===========================================================
       RECURRING TASK LOGIC
    =========================================================== */
    if (!data.recurringFrequency) {
        ctx.addIssue({
            path: ["recurringFrequency"],
            message: constants_1.ErrorMessages.RECURRING_FREQUENCY_REQUIRED,
            code: zod_1.z.ZodIssueCode.custom,
        });
    }
    if (!data.recurringEndDate) {
        ctx.addIssue({
            path: ["recurringEndDate"],
            message: "Recurring tasks must have an end date",
            code: zod_1.z.ZodIssueCode.custom,
        });
    }
    // DAILY → no weekdays allowed
    if (data.recurringFrequency === enums_1.RecurringFrequencyEnum.DAILY) {
        if (data.recurringWeekDays) {
            ctx.addIssue({
                path: ["recurringWeekDays"],
                message: "recurringWeekDays must not be provided for DAILY recurring tasks",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
    }
    // WEEKLY → weekdays required
    if (data.recurringFrequency === enums_1.RecurringFrequencyEnum.WEEKLY) {
        if (!data.recurringWeekDays || data.recurringWeekDays.length === 0) {
            ctx.addIssue({
                path: ["recurringWeekDays"],
                message: "You must select at least one weekday for WEEKLY recurring tasks",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
    }
    // ❗ deadline must NOT be provided for recurring tasks
    if (data.deadline) {
        ctx.addIssue({
            path: ["deadline"],
            message: "Deadline must not be provided for recurring tasks. It will be auto-generated.",
            code: zod_1.z.ZodIssueCode.custom,
        });
    }
});

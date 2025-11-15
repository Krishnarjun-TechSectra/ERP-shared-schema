"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMasterSchema = void 0;
const zod_1 = require("zod");
const weekday_enum_1 = require("../../../core/enums/weekday.enum");
const user_1 = require("../../user");
const schemas_1 = require("../../kpi/schemas");
const constants_1 = require("../../../core/constants");
const enums_1 = require("../enums");
exports.TaskMasterSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID),
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
    recurringWeekDays: zod_1.z.array(zod_1.z.nativeEnum(weekday_enum_1.WeekdayEnum)).nullable().optional(),
    assignedUserId: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID).optional(),
    assignedUser: user_1.UserSchema.partial().optional(),
    kpiId: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID).optional(),
    kpi: schemas_1.KpiSchema.partial().optional(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
})
    .strict() // no extra fields allowed (including deadline!)
    .superRefine((data, ctx) => {
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
        return; // done
    }
    // frequency required
    if (!data.recurringFrequency) {
        ctx.addIssue({
            path: ["recurringFrequency"],
            message: constants_1.ErrorMessages.RECURRING_FREQUENCY_REQUIRED,
            code: zod_1.z.ZodIssueCode.custom,
        });
    }
    // end date required
    if (!data.recurringEndDate) {
        ctx.addIssue({
            path: ["recurringEndDate"],
            message: "End date is required for recurring tasks",
            code: zod_1.z.ZodIssueCode.custom,
        });
    }
    // WEEKLY → weekdays required
    if (data.recurringFrequency === enums_1.RecurringFrequencyEnum.WEEKLY) {
        if (!data.recurringWeekDays || data.recurringWeekDays.length === 0) {
            ctx.addIssue({
                path: ["recurringWeekDays"],
                message: "Weekdays must be selected for weekly recurring tasks",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
    }
    // DAILY → weekdays must NOT exist
    if (data.recurringFrequency === enums_1.RecurringFrequencyEnum.DAILY) {
        if (data.recurringWeekDays) {
            ctx.addIssue({
                path: ["recurringWeekDays"],
                message: "Weekdays must not be provided for DAILY recurring tasks",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
    }
    // timestamps validation
    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
        ctx.addIssue({
            path: ["updatedAt"],
            message: constants_1.ErrorMessages.INVALID_TIMESTAMPS,
            code: zod_1.z.ZodIssueCode.custom,
        });
    }
});

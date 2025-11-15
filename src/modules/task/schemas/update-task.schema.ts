import { z } from "zod";
import {
  TaskPriorityEnum,
  TaskStatusEnum,
  RecurringFrequencyEnum,
} from "../enums";
import { ErrorMessages } from "../../../core/constants";
import { WeekdayEnum } from "../../../core/enums";

export const UpdateTaskSchema = z
  .object({
    /* ---------------- MASTER FIELDS ---------------- */

    title: z
      .string()
      .min(1, ErrorMessages.REQUIRED)
      .max(200, ErrorMessages.TITLE_TOO_LONG)
      .optional(),

    description: z
      .string()
      .max(2000, ErrorMessages.DESCRIPTION_TOO_LONG)
      .optional(),

    priority: z.nativeEnum(TaskPriorityEnum).optional(),

    isRecurring: z.boolean().optional(),

    recurringFrequency: z
      .nativeEnum(RecurringFrequencyEnum)
      .nullable()
      .optional(),

    recurringEndDate: z.coerce
      .date({ error: ErrorMessages.INVALID_DATE })
      .nullable()
      .optional(),

    recurringWeekDays: z.array(z.nativeEnum(WeekdayEnum)).nullable().optional(),

    assignedUserId: z.string().uuid(ErrorMessages.INVALID_UUID).optional(),

    kpiId: z.string().uuid(ErrorMessages.INVALID_UUID).optional(),

    /* ---------------- INSTANCE FIELDS ---------------- */

    deadline: z.coerce.date().optional(),

    status: z.nativeEnum(TaskStatusEnum).optional(),

    completionDate: z.coerce.date().nullable().optional(),

    proofOfCompletion: z.string().nullable().optional(),
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
      if (
        data.recurringFrequency ||
        data.recurringEndDate ||
        data.recurringWeekDays
      ) {
        ctx.addIssue({
          path: ["isRecurring"],
          message: ErrorMessages.RECURRING_FIELDS_INVALID,
          code: z.ZodIssueCode.custom,
        });
      }
      // For non-recurring tasks → deadline MUST be allowed
      return;
    }

    /* ===========================================================
       IF isRecurring is TRUE (or recurring fields are present)
       → Apply recurring rules
    =========================================================== */
    const recurringMode =
      data.isRecurring === true ||
      data.recurringFrequency !== undefined ||
      data.recurringEndDate !== undefined ||
      data.recurringWeekDays !== undefined;

    if (recurringMode) {
      // 1. frequency required if provided
      if (!data.recurringFrequency) {
        ctx.addIssue({
          path: ["recurringFrequency"],
          message: ErrorMessages.RECURRING_FREQUENCY_REQUIRED,
          code: z.ZodIssueCode.custom,
        });
      }

      // 2. end date required
      if (!data.recurringEndDate) {
        ctx.addIssue({
          path: ["recurringEndDate"],
          message: "Recurring tasks must have an end date",
          code: z.ZodIssueCode.custom,
        });
      }

      // DAILY rules
      if (data.recurringFrequency === RecurringFrequencyEnum.DAILY) {
        if (data.recurringWeekDays) {
          ctx.addIssue({
            path: ["recurringWeekDays"],
            message:
              "recurringWeekDays must not be provided for DAILY recurring tasks",
            code: z.ZodIssueCode.custom,
          });
        }
      }

      // WEEKLY rules
      if (data.recurringFrequency === RecurringFrequencyEnum.WEEKLY) {
        if (!data.recurringWeekDays || data.recurringWeekDays.length === 0) {
          ctx.addIssue({
            path: ["recurringWeekDays"],
            message:
              "You must select at least one weekday for WEEKLY recurring tasks",
            code: z.ZodIssueCode.custom,
          });
        }
      }

      // recurring task cannot accept deadline
      if (data.deadline) {
        ctx.addIssue({
          path: ["deadline"],
          message:
            "Deadline must not be provided for recurring tasks. It will be auto-generated.",
          code: z.ZodIssueCode.custom,
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
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

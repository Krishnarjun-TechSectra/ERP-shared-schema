import { z } from "zod";
import {
  TaskPriorityEnum,
  TaskStatusEnum,
  RecurringFrequencyEnum,
} from "../enums";

import { WeekdayEnum } from "../../../core/enums";
import { ErrorMessages } from "../../../core/constants";

export const CreateTaskSchema = z
  .object({
    /* ---------------- MASTER FIELDS ---------------- */

    title: z
      .string()
      .min(1, ErrorMessages.REQUIRED)
      .max(200, ErrorMessages.TITLE_TOO_LONG),

    description: z
      .string()
      .max(2000, ErrorMessages.DESCRIPTION_TOO_LONG)
      .optional(),

    priority: z.nativeEnum(TaskPriorityEnum).default(TaskPriorityEnum.MEDIUM),

    isRecurring: z.boolean(),

    recurringFrequency: z
      .nativeEnum(RecurringFrequencyEnum)
      .nullable()
      .optional(),

    recurringEndDate: z.coerce
      .date({ error: ErrorMessages.INVALID_DATE })
      .nullable()
      .optional(),

    recurringWeekDays: z.array(z.nativeEnum(WeekdayEnum)).nullable().optional(),

    assignedUserId: z.string().uuid(ErrorMessages.INVALID_UUID),

    kpiId: z.string().uuid(ErrorMessages.INVALID_UUID).optional(),


    /* ---------------- INSTANCE FIELDS ---------------- */

    // ❗ For non-recurring tasks FE must send deadline
    // ❗ For recurring tasks FE must NOT send deadline
    deadline: z.coerce.date().optional(),

    status: z.nativeEnum(TaskStatusEnum).default(TaskStatusEnum.TODO),

    completionDate: z.coerce.date().nullable().optional(),

    proofOfCompletion: z.string().nullable().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    /* ===========================================================
       NON-RECURRING TASK LOGIC
    =========================================================== */
    if (!data.isRecurring) {
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

      // deadline REQUIRED for non-recurring tasks
      if (!data.deadline) {
        ctx.addIssue({
          path: ["deadline"],
          message: "Deadline is required for non-recurring tasks",
          code: z.ZodIssueCode.custom,
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
        message: ErrorMessages.RECURRING_FREQUENCY_REQUIRED,
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.recurringEndDate) {
      ctx.addIssue({
        path: ["recurringEndDate"],
        message: "Recurring tasks must have an end date",
        code: z.ZodIssueCode.custom,
      });
    }

    // DAILY → no weekdays allowed
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

    // WEEKLY → weekdays required
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

    // ❗ deadline must NOT be provided for recurring tasks
    if (data.deadline) {
      ctx.addIssue({
        path: ["deadline"],
        message:
          "Deadline must not be provided for recurring tasks. It will be auto-generated.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

import { z } from "zod";

import { WeekdayEnum } from "../../../core/enums/weekday.enum";

import { UserSchema } from "../../user";
import { KpiSchema } from "../../kpi/schemas";
import { ErrorMessages } from "../../../core/constants";
import { RecurringFrequencyEnum, TaskPriorityEnum } from "../enums";

export const TaskMasterSchema = z
  .object({
    id: z.string().uuid(ErrorMessages.INVALID_UUID),

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

    assignedUserId: z.string().uuid(ErrorMessages.INVALID_UUID).optional(),
    assignedUser: UserSchema.partial().optional(),

    kpiId: z.string().uuid(ErrorMessages.INVALID_UUID).optional(),
    kpi: KpiSchema.partial().optional(),

    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict() // no extra fields allowed (including deadline!)
  .superRefine((data, ctx) => {
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
      return; // done
    }

    // frequency required
    if (!data.recurringFrequency) {
      ctx.addIssue({
        path: ["recurringFrequency"],
        message: ErrorMessages.RECURRING_FREQUENCY_REQUIRED,
        code: z.ZodIssueCode.custom,
      });
    }

    // end date required
    if (!data.recurringEndDate) {
      ctx.addIssue({
        path: ["recurringEndDate"],
        message: "End date is required for recurring tasks",
        code: z.ZodIssueCode.custom,
      });
    }

    // WEEKLY → weekdays required
    if (data.recurringFrequency === RecurringFrequencyEnum.WEEKLY) {
      if (!data.recurringWeekDays || data.recurringWeekDays.length === 0) {
        ctx.addIssue({
          path: ["recurringWeekDays"],
          message: "Weekdays must be selected for weekly recurring tasks",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // DAILY → weekdays must NOT exist
    if (data.recurringFrequency === RecurringFrequencyEnum.DAILY) {
      if (data.recurringWeekDays) {
        ctx.addIssue({
          path: ["recurringWeekDays"],
          message: "Weekdays must not be provided for DAILY recurring tasks",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // timestamps validation
    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
      ctx.addIssue({
        path: ["updatedAt"],
        message: ErrorMessages.INVALID_TIMESTAMPS,
        code: z.ZodIssueCode.custom,
      });
    }
  });

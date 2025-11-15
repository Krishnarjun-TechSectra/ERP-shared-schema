import { z } from "zod";
import { TaskStatusEnum } from "../enums";
import { ViewTypeEnum } from "../enums";
import { ErrorMessages } from "../../../core/constants";

export const TaskFilterSchema = z
  .object({
    status: z.nativeEnum(TaskStatusEnum).optional(),

    assignedUserId: z.string().uuid(ErrorMessages.INVALID_UUID).optional(),

    viewType: z.nativeEnum(ViewTypeEnum).optional(),

    // Selected date (string for flexibility; FE will send YYYY-MM-DD or ISO)
    selectedDate: z
      .string()
      .optional()
      .refine(
        (val) => !val || !isNaN(Date.parse(val)),
        ErrorMessages.INVALID_DATE
      ),
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
        code: z.ZodIssueCode.custom,
        message: "selectedDate is required when viewType is provided",
      });
    }

    /* ------------------------------------------------------
       selectedDate cannot be an invalid date
    -------------------------------------------------------*/
    if (data.selectedDate && isNaN(Date.parse(data.selectedDate))) {
      ctx.addIssue({
        path: ["selectedDate"],
        code: z.ZodIssueCode.custom,
        message: ErrorMessages.INVALID_DATE,
      });
    }
  });

import { z } from "zod";
import { TaskStatusEnum } from "../enums";
import { ErrorMessages } from "../../../core/constants";

export const TaskInstanceSchema = z
  .object({
    id: z.string().uuid(ErrorMessages.INVALID_UUID),

    taskMasterId: z.string().uuid(ErrorMessages.INVALID_UUID),

    status: z.nativeEnum(TaskStatusEnum).default(TaskStatusEnum.TODO),

    // ALWAYS required, even for recurring tasks
    deadline: z.coerce.date({
      error: ErrorMessages.INVALID_DATE,
    }),

    completionDate: z.coerce
      .date({ error: ErrorMessages.INVALID_DATE })
      .nullable()
      .optional(),

    proofOfCompletion: z.string().nullable().optional(),

    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.completionDate && data.completionDate > data.deadline) {
      ctx.addIssue({
        path: ["completionDate"],
        message: "Completion date cannot be after the deadline",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
      ctx.addIssue({
        path: ["updatedAt"],
        message: ErrorMessages.INVALID_TIMESTAMPS,
        code: z.ZodIssueCode.custom,
      });
    }
  });

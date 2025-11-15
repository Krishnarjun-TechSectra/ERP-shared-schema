import { z } from "zod";
import { ErrorMessages } from "../../../core/constants";

export const KpiSchema = z
  .object({
    id: z.string().uuid(ErrorMessages.INVALID_UUID).optional(),

    title: z
      .string()
      .min(1, ErrorMessages.REQUIRED),

    description: z.string().optional(),

    colorCode: z
      .string()
      .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid hex color code")
      .min(1, ErrorMessages.REQUIRED),

    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["updatedAt"],
        message: ErrorMessages.INVALID_TIMESTAMPS,
      });
    }
  });

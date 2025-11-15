import { z } from "zod";
import { ErrorMessages } from "../../../core/constants";
import { RoleEnum } from "../enums/user-role.enum";

export const UserSchema = z
  .object({
    id: z.string().uuid(ErrorMessages.INVALID_UUID),

    name: z.string().min(1, ErrorMessages.REQUIRED),

    email: z.string().email("Invalid email"),

    role: z.nativeEnum(RoleEnum).default(RoleEnum.EMPLOYEE),

    kpiScore: z
      .number()
      .min(0, "The min value must be greater than or equal to 0")
      .max(100, "The max value must be less than or equal to 100")
      .optional(),

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

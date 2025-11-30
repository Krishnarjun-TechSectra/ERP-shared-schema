import { z } from "zod";
import { ErrorMessages } from "../../../core/constants";

export const GoalSchema = z
  .object({
    id: z.string().uuid(ErrorMessages.INVALID_UUID).optional(),

    // 1. Goal Name (Sales)
    name: z
      .string()
      .min(1, ErrorMessages.REQUIRED),

    // 2. Deadline (20 Dec)
    deadline: z.coerce.date(),

    // 3. Weightage Level (Level 1–5)
    weightageLevel: z
      .number()
      .int()
      .min(1, "Weightage level must be at least 1")
      .max(5, "Weightage level must be at most 5"),

    // 4. Target (ex: 20 Lacs)
    target: z
      .number()
      .min(0, "Target must be a positive number"),

    // 5. Assigned user
    assignedUserId: z
      .string()
      .uuid(ErrorMessages.INVALID_UUID),
      
     // NEW: progress % (for slider)
    progress: z
      .number()
      .int()
      .min(0, "Progress cannot be less than 0")
      .max(100, "Progress cannot be more than 100")
      .default(0),

    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    // same logic as KPI for timestamps
    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["updatedAt"],
        message: ErrorMessages.INVALID_TIMESTAMPS,
      });
    }
  });

export type GoalSchemaType = z.infer<typeof GoalSchema>;

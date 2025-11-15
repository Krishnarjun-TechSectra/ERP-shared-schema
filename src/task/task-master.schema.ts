import z from "zod";
import { RecurringFrequencyEnum, TaskPriorityEnum } from "./task.enum";
import { UserSchema } from "../user";
import { KpiSchema } from "../kpi";

export const TaskMasterSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(TaskPriorityEnum).default(TaskPriorityEnum.MEDIUM),

  isRecurring: z.boolean(),
  recurringFrequency: z
    .nativeEnum(RecurringFrequencyEnum)
    .nullable()
    .optional(),
  recurringEndDate: z.coerce.date().nullable().optional(),

  assignedUserId: z.string().uuid().optional(),
  assignedUser: UserSchema.partial().optional(),

  kpiId: z.string().uuid().optional(),
  kpi: KpiSchema.partial().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

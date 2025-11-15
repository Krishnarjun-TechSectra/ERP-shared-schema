import z from "zod";
import { TaskStatusEnum } from "./task.enum";

export const TaskInstanceSchema = z.object({
  id: z.string().uuid(),
  taskMasterId: z.string().uuid(),

  status: z.enum(TaskStatusEnum).default(TaskStatusEnum.TODO),
  deadline: z.coerce.date(),

  completionDate: z.coerce.date().nullable().optional(),
  proofOfCompletion: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
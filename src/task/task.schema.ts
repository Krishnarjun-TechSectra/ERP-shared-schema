import { z } from "zod";
import { UserSchema } from "../user";
import { KpiSchema } from "../kpi";


export enum TaskPriorityEnum {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum TaskStatusEnum {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export enum RecurringFrequencyEnum {
  DAILY = "Daily",
  WEEKLY = "Weekly",
}

export enum ViewTypeEnum {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

/* -------------------------------
   SHARED ZOD SCHEMA
--------------------------------*/

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(TaskPriorityEnum).default(TaskPriorityEnum.MEDIUM),
  deadline: z.coerce.date(),
  isRecurring: z.boolean(),
  recurringFrequency: z
    .nativeEnum(RecurringFrequencyEnum)
    .optional()
    .nullable(),
  status: z.enum(TaskStatusEnum).default(TaskStatusEnum.TODO),
  proofOfCompletion: z.string().nullable().optional(),
  assignedUserId: z.string().uuid().optional(),
  assignedUser: UserSchema.partial().optional(),
  kpiId: z.string().uuid().optional(),
  kpi: KpiSchema.partial().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;

/* -------------------------------
   CREATE TASK DTO
--------------------------------*/

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  title: z.string().min(1, "Title is required"),
  assignedUserId: z
    .string()
    .uuid({ message: "Assigned user ID must be a valid UUID" }),
  kpiId: z.string().uuid({ message: "KPI ID must be a valid UUID" }),
});

export type CreateTaskDTO = z.infer<typeof CreateTaskSchema>;

/* -------------------------------
   UPDATE TASK DTO
--------------------------------*/

export const UpdateTaskSchema = TaskSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateTaskDTO = z.infer<typeof UpdateTaskSchema>;

export const TaskFilterSchema = z.object({
  assignedUserId: z.string().optional(),
  viewType: z.enum(ViewTypeEnum).optional(),
  date: z.coerce.date().optional(), // will handle "2025-11-05T00:00:00Z"
  month: z.coerce.number().min(1).max(12).optional(), // "11" → 11
  year: z.coerce.number().min(2000).max(2100).optional(), // "2025" → 2025
});


export type TaskFilterDTO = z.infer<typeof TaskFilterSchema>;

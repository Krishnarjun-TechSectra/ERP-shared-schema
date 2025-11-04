import { z } from 'zod';

/* -------------------------------
   ENUM DEFINITIONS
--------------------------------*/
export enum TaskPriorityEnum {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum TaskStatusEnum {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export enum RecurringFrequencyEnum {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

// View type for filtering
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
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(TaskPriorityEnum).default(TaskPriorityEnum.MEDIUM),
  deadline: z.coerce.date(),
  isRecurring: z.boolean(),
  recurringFrequency: z
    .enum(RecurringFrequencyEnum)
    .nullable()
    .optional()
    .default(RecurringFrequencyEnum.DAILY),
  status: z.enum(TaskStatusEnum).default(TaskStatusEnum.TODO),
  proofOfCompletion: z.string().nullable().optional(),
  assignedUserId: z.string().uuid().optional(),
  kpiId: z.string().uuid().optional(),
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
  title: z.string().min(1, 'Title is required'),
  assignedUserId: z.string().uuid({ message: 'Assigned user ID must be a valid UUID' }),
  kpiId: z.string().uuid({ message: 'KPI ID must be a valid UUID' }),
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
  assignedUserId: z.string().uuid().optional(),
  viewType: z.enum(ViewTypeEnum).optional(),
  startDate: z.coerce.date().optional(), // used internally for filtering range
  endDate: z.coerce.date().optional(),   // used internally for filtering range
});

/**
 * Notes:
 * - `assignedUserId`: filter tasks assigned to a specific user
 * - `viewType`: determines the time period to filter (daily, weekly, monthly, yearly)
 * - You can derive `startDate` and `endDate` based on `viewType` in service logic
 */

export type TaskFilterDTO = z.infer<typeof TaskFilterSchema>;
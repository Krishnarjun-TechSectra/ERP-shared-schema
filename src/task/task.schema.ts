import { z } from "zod";
import { UserSchema } from "../user";
import { KpiSchema } from "../kpi";

/* -------------------------------
   ENUMS
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
  OVERDUE = "Overdue",
}

export enum RecurringFrequencyEnum {
  DAILY = "Daily",
  WEEKLY = "Weekly",
}

export enum ViewTypeEnum {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

/* ============================================
   MASTER TASK (Recurring Template)
============================================ */

export const TaskMasterSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(TaskPriorityEnum).default(TaskPriorityEnum.MEDIUM),

  // RECURRING INFO
  isRecurring: z.boolean(),
  recurringFrequency: z.nativeEnum(RecurringFrequencyEnum).nullable().optional(),

  // ASSIGNMENT
  assignedUserId: z.string().uuid().optional(),
  assignedUser: UserSchema.partial().optional(),

  kpiId: z.string().uuid().optional(),
  kpi: KpiSchema.partial().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type TaskMasterSchemaType = z.infer<typeof TaskMasterSchema>;

/* ------------ CREATE TASK MASTER DTO ------------ */

export const CreateTaskMasterSchema = TaskMasterSchema.omit({
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

export type CreateTaskMasterDTO = z.infer<typeof CreateTaskMasterSchema>;

/* ------------ UPDATE TASK MASTER DTO ------------ */

export const UpdateTaskMasterSchema = TaskMasterSchema.partial().omit({
  id: true,
});
export type UpdateTaskMasterDTO = z.infer<typeof UpdateTaskMasterSchema>;

/* ============================================
   TASK INSTANCE (Actual Daily/Weekly Tasks)
============================================ */

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

export type TaskInstanceSchemaType = z.infer<typeof TaskInstanceSchema>;

/* ------------ CREATE TASK INSTANCE DTO ------------ */

export const CreateTaskSchema = z.object({
  // ------- MASTER FIELDS -------
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(TaskPriorityEnum).default(TaskPriorityEnum.MEDIUM),

  isRecurring: z.boolean(),
  recurringFrequency: z
    .nativeEnum(RecurringFrequencyEnum)
    .nullable()
    .optional(),

  assignedUserId: z
    .string()
    .uuid({ message: "Assigned user ID must be a valid UUID" }),
  kpiId: z.string().uuid({ message: "KPI ID must be a valid UUID" }),

  // ------- INSTANCE FIELDS -------
  deadline: z.coerce.date(),
  status: z.enum(TaskStatusEnum).default(TaskStatusEnum.TODO),
  completionDate: z.coerce.date().nullable().optional(),
  proofOfCompletion: z.string().nullable().optional(),
});


export type CreateTaskDTO = z.infer<
  typeof CreateTaskSchema
>;

/* ------------ UPDATE TASK INSTANCE DTO ------------ */

export const UpdateTaskSchema = z.object({
  // TaskMaster editable fields
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(TaskPriorityEnum).optional(),
  isRecurring: z.boolean().optional(),
  recurringFrequency: z
    .nativeEnum(RecurringFrequencyEnum)
    .nullable()
    .optional(),
  assignedUserId: z.string().uuid().optional(),
  kpiId: z.string().uuid().optional(),

  // TaskInstance editable fields
  status: z.enum(TaskStatusEnum).optional(),
  deadline: z.coerce.date().optional(),
  completionDate: z.coerce.date().nullable().optional(),
  proofOfCompletion: z.string().nullable().optional(),
});

export type UpdateTaskDTO = z.infer<
  typeof UpdateTaskSchema
>;

/* ============================================
   FILTER SCHEMA (applies to instances only)
============================================ */

export const TaskFilterSchema = z
  .object({
    status: z.nativeEnum(TaskStatusEnum).optional(),
    assignedUserId: z.string().optional(),
    viewType: z.nativeEnum(ViewTypeEnum).optional(),
    selectedDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.viewType && !data.selectedDate) {
      ctx.addIssue({
        path: ["selectedDate"],
        code: z.ZodIssueCode.custom,
        message: "selectedDate is required when viewType is provided",
      });
    }
  });

export type TaskFilterDTO = z.infer<typeof TaskFilterSchema>;

import { createZodDto } from 'nestjs-zod';
import { z } from 'zod/v4';
/**
 * -------------------------------
 * ENUM DEFINITIONS
 * -------------------------------
 */
export const TaskPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
};
export const RecurringFrequency = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    NIL: '',
};
export const TaskStatus = {
    TODO: 'to_do',
    IN_PROGRESS: 'in_progress',
    OVERDUE: 'overdue',
    COMPLETED: 'completed',
};
/**
 * -------------------------------
 * BASE SCHEMA
 * -------------------------------
 */
const TaskBaseSchema = z.object({
    title: z
        .string({ error: 'Title is required' })
        .min(1, 'Title cannot be empty')
        .max(100, 'Title must be under 100 characters'),
    description: z
        .string()
        .max(1000, 'Description too long')
        .optional(),
    kpi_id: z
        .string()
        .uuid('Invalid KPI ID format')
        .optional(),
    assignTo: z
        .string({ error: 'Assignee is required' })
        .uuid('Invalid user ID format'),
    priority: z.enum(TaskPriority, { error: 'Priority is required' }),
    deadline: z
        .string({ error: 'Deadline is required' })
        .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid deadline format. Use ISO 8601 date string.',
    }),
    isRecurring: z.boolean().default(false),
    recurringFrequency: z
        .enum(RecurringFrequency, { error: 'Recurring frequency must be specified' })
        .optional(),
    status: z.enum(TaskStatus).default(TaskStatus.TODO),
    proof_of_complete: z
        .string()
        .optional(),
});
/**
 * -------------------------------
 * CONDITIONAL VALIDATION
 * -------------------------------
 */
export const TaskSchema = TaskBaseSchema.superRefine((data, ctx) => {
    if (data.status === TaskStatus.COMPLETED && !data.proof_of_complete) {
        ctx.addIssue({
            code: 'custom',
            message: 'Proof of completion is required when status is completed.',
            path: ['proof_of_complete'],
        });
    }
});
/**
 * -------------------------------
 * VARIANTS FOR CREATE / UPDATE
 * -------------------------------
 */
export const CreateTaskSchema = TaskSchema.extend({
    status: z
        .enum(TaskStatus)
        .default(TaskStatus.TODO),
});
export const UpdateTaskSchema = TaskSchema.partial();
/**
 * -------------------------------
 * NESTJS DTOs (for Controllers)
 * -------------------------------
 */
export class CreateTaskDto extends createZodDto(CreateTaskSchema) {
}
export class UpdateTaskDto extends createZodDto(UpdateTaskSchema) {
}

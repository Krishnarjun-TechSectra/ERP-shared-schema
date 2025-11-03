"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDto = exports.CreateTaskDto = exports.UpdateTaskSchema = exports.CreateTaskSchema = exports.TaskSchema = exports.TaskStatus = exports.RecurringFrequency = exports.TaskPriority = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const v4_1 = require("zod/v4");
/**
 * -------------------------------
 * ENUM DEFINITIONS
 * -------------------------------
 */
exports.TaskPriority = v4_1.z.enum(['low', 'medium', 'high']);
exports.RecurringFrequency = v4_1.z.enum(['daily', 'weekly', '']);
exports.TaskStatus = v4_1.z.enum([
    'to_do',
    'in_progress',
    'completed',
    'overdue',
]);
/**
 * -------------------------------
 * BASE SCHEMA
 * -------------------------------
 */
const TaskBaseSchema = v4_1.z.object({
    title: v4_1.z
        .string({ error: 'Title is required' })
        .min(1, 'Title cannot be empty')
        .max(150, 'Title must be under 150 characters'),
    description: v4_1.z.string().max(1000, 'Description too long').optional(),
    // Foreign key fields
    kpiId: v4_1.z.string().uuid('Invalid KPI ID format').optional(),
    assignedTo: v4_1.z.string().uuid('Invalid User ID format').optional(),
    // Optional embedded user object (when returning populated data)
    assignedUser: v4_1.z
        .object({
        id: v4_1.z.string().uuid(),
        name: v4_1.z.string().optional(),
        email: v4_1.z.string().email().optional(),
    })
        .optional(),
    priority: exports.TaskPriority.default('medium'),
    deadline: v4_1.z
        .string({ error: 'Deadline is required' })
        .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format. Use ISO 8601 string.',
    })
        .optional(),
    status: exports.TaskStatus.default('to_do'),
    isRecurring: v4_1.z.boolean().default(false),
    recurringFrequency: exports.RecurringFrequency.optional(),
    proofOfCompletion: v4_1.z.string().optional(),
});
/**
 * -------------------------------
 * CONDITIONAL VALIDATION
 * -------------------------------
 */
exports.TaskSchema = TaskBaseSchema.superRefine((data, ctx) => {
    if (data.status === 'completed' && !data.proofOfCompletion) {
        ctx.addIssue({
            code: 'custom',
            message: 'Proof of completion is required when status is completed.',
            path: ['proofOfCompletion'],
        });
    }
});
/**
 * -------------------------------
 * CREATE / UPDATE VARIANTS
 * -------------------------------
 */
exports.CreateTaskSchema = exports.TaskSchema.safeExtend({
    title: v4_1.z.string({ error: 'Title is required' }),
    assignedTo: v4_1.z
        .string({ error: 'Assigned user is required' })
        .uuid('Invalid User ID format'),
    kpiId: v4_1.z.string().uuid('Invalid KPI ID format').optional(),
    status: exports.TaskStatus.default('to_do'),
});
exports.UpdateTaskSchema = exports.TaskSchema.partial();
/**
 * -------------------------------
 * NESTJS DTO CLASSES
 * -------------------------------
 */
class CreateTaskDto extends (0, nestjs_zod_1.createZodDto)(exports.CreateTaskSchema) {
}
exports.CreateTaskDto = CreateTaskDto;
class UpdateTaskDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateTaskSchema) {
}
exports.UpdateTaskDto = UpdateTaskDto;

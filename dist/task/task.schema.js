"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFilterSchema = exports.UpdateTaskInstanceSchema = exports.CreateTaskInstanceSchema = exports.TaskInstanceSchema = exports.UpdateTaskMasterSchema = exports.CreateTaskMasterSchema = exports.TaskMasterSchema = exports.ViewTypeEnum = exports.RecurringFrequencyEnum = exports.TaskStatusEnum = exports.TaskPriorityEnum = void 0;
const zod_1 = require("zod");
const user_1 = require("../user");
const kpi_1 = require("../kpi");
/* -------------------------------
   ENUMS
--------------------------------*/
var TaskPriorityEnum;
(function (TaskPriorityEnum) {
    TaskPriorityEnum["LOW"] = "Low";
    TaskPriorityEnum["MEDIUM"] = "Medium";
    TaskPriorityEnum["HIGH"] = "High";
})(TaskPriorityEnum || (exports.TaskPriorityEnum = TaskPriorityEnum = {}));
var TaskStatusEnum;
(function (TaskStatusEnum) {
    TaskStatusEnum["TODO"] = "To Do";
    TaskStatusEnum["IN_PROGRESS"] = "In Progress";
    TaskStatusEnum["COMPLETED"] = "Completed";
    TaskStatusEnum["OVERDUE"] = "Overdue";
})(TaskStatusEnum || (exports.TaskStatusEnum = TaskStatusEnum = {}));
var RecurringFrequencyEnum;
(function (RecurringFrequencyEnum) {
    RecurringFrequencyEnum["DAILY"] = "Daily";
    RecurringFrequencyEnum["WEEKLY"] = "Weekly";
})(RecurringFrequencyEnum || (exports.RecurringFrequencyEnum = RecurringFrequencyEnum = {}));
var ViewTypeEnum;
(function (ViewTypeEnum) {
    ViewTypeEnum["DAILY"] = "daily";
    ViewTypeEnum["WEEKLY"] = "weekly";
    ViewTypeEnum["MONTHLY"] = "monthly";
    ViewTypeEnum["YEARLY"] = "yearly";
})(ViewTypeEnum || (exports.ViewTypeEnum = ViewTypeEnum = {}));
/* ============================================
   MASTER TASK (Recurring Template)
============================================ */
exports.TaskMasterSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().optional(),
    priority: zod_1.z.enum(TaskPriorityEnum).default(TaskPriorityEnum.MEDIUM),
    // RECURRING INFO
    isRecurring: zod_1.z.boolean(),
    recurringFrequency: zod_1.z.nativeEnum(RecurringFrequencyEnum).nullable().optional(),
    // ASSIGNMENT
    assignedUserId: zod_1.z.string().uuid().optional(),
    assignedUser: user_1.UserSchema.partial().optional(),
    kpiId: zod_1.z.string().uuid().optional(),
    kpi: kpi_1.KpiSchema.partial().optional(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
});
/* ------------ CREATE TASK MASTER DTO ------------ */
exports.CreateTaskMasterSchema = exports.TaskMasterSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    title: zod_1.z.string().min(1, "Title is required"),
    assignedUserId: zod_1.z
        .string()
        .uuid({ message: "Assigned user ID must be a valid UUID" }),
    kpiId: zod_1.z.string().uuid({ message: "KPI ID must be a valid UUID" }),
});
/* ------------ UPDATE TASK MASTER DTO ------------ */
exports.UpdateTaskMasterSchema = exports.TaskMasterSchema.partial().omit({
    id: true,
});
/* ============================================
   TASK INSTANCE (Actual Daily/Weekly Tasks)
============================================ */
exports.TaskInstanceSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    taskMasterId: zod_1.z.string().uuid(),
    status: zod_1.z.enum(TaskStatusEnum).default(TaskStatusEnum.TODO),
    deadline: zod_1.z.coerce.date(),
    completionDate: zod_1.z.coerce.date().nullable().optional(),
    proofOfCompletion: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
});
/* ------------ CREATE TASK INSTANCE DTO ------------ */
exports.CreateTaskInstanceSchema = exports.TaskInstanceSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    completionDate: true,
    proofOfCompletion: true,
});
/* ------------ UPDATE TASK INSTANCE DTO ------------ */
exports.UpdateTaskInstanceSchema = exports.TaskInstanceSchema.partial().omit({
    id: true,
    taskMasterId: true,
});
/* ============================================
   FILTER SCHEMA (applies to instances only)
============================================ */
exports.TaskFilterSchema = zod_1.z
    .object({
    status: zod_1.z.nativeEnum(TaskStatusEnum).optional(),
    assignedUserId: zod_1.z.string().optional(),
    viewType: zod_1.z.nativeEnum(ViewTypeEnum).optional(),
    selectedDate: zod_1.z.string().optional(),
})
    .superRefine((data, ctx) => {
    if (data.viewType && !data.selectedDate) {
        ctx.addIssue({
            path: ["selectedDate"],
            code: zod_1.z.ZodIssueCode.custom,
            message: "selectedDate is required when viewType is provided",
        });
    }
});

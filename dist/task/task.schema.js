"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFilterSchema = exports.UpdateTaskSchema = exports.CreateTaskSchema = exports.TaskSchema = exports.ViewTypeEnum = exports.RecurringFrequencyEnum = exports.TaskStatusEnum = exports.TaskPriorityEnum = void 0;
const zod_1 = require("zod");
const user_1 = require("../user");
const kpi_1 = require("../kpi");
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
    ViewTypeEnum["DAILY"] = "Daily";
    ViewTypeEnum["WEEKLY"] = "Weekly";
    ViewTypeEnum["MONTHLY"] = "Monthly";
    ViewTypeEnum["YEARLY"] = "Yearly";
})(ViewTypeEnum || (exports.ViewTypeEnum = ViewTypeEnum = {}));
/* -------------------------------
   SHARED ZOD SCHEMA
--------------------------------*/
exports.TaskSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().optional(),
    priority: zod_1.z.enum(TaskPriorityEnum).default(TaskPriorityEnum.MEDIUM),
    deadline: zod_1.z.coerce.date(),
    isRecurring: zod_1.z.boolean(),
    recurringFrequency: zod_1.z
        .nativeEnum(RecurringFrequencyEnum)
        .optional()
        .nullable(),
    status: zod_1.z.enum(TaskStatusEnum).default(TaskStatusEnum.TODO),
    proofOfCompletion: zod_1.z.string().nullable().optional(),
    assignedUserId: zod_1.z.string().uuid().optional(),
    assignedUser: user_1.UserSchema.partial().optional(),
    kpiId: zod_1.z.string().uuid().optional(),
    kpi: kpi_1.KpiSchema.partial().optional(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
});
/* -------------------------------
   CREATE TASK DTO
--------------------------------*/
exports.CreateTaskSchema = exports.TaskSchema.omit({
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
/* -------------------------------
   UPDATE TASK DTO
--------------------------------*/
exports.UpdateTaskSchema = exports.TaskSchema.partial().omit({ id: true });
exports.TaskFilterSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(TaskStatusEnum).optional(),
    assignedUserId: zod_1.z.string().optional(),
    viewType: zod_1.z.nativeEnum(ViewTypeEnum).optional(),
    selectedDate: zod_1.z.string(),
});

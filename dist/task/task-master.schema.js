"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMasterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const task_enum_1 = require("./task.enum");
const user_1 = require("../user");
const kpi_1 = require("../kpi");
exports.TaskMasterSchema = zod_1.default.object({
    id: zod_1.default.string().uuid(),
    title: zod_1.default.string().min(1, "Title is required"),
    description: zod_1.default.string().optional(),
    priority: zod_1.default.enum(task_enum_1.TaskPriorityEnum).default(task_enum_1.TaskPriorityEnum.MEDIUM),
    isRecurring: zod_1.default.boolean(),
    recurringFrequency: zod_1.default
        .nativeEnum(task_enum_1.RecurringFrequencyEnum)
        .nullable()
        .optional(),
    recurringEndDate: zod_1.default.coerce.date().nullable().optional(),
    assignedUserId: zod_1.default.string().uuid().optional(),
    assignedUser: user_1.UserSchema.partial().optional(),
    kpiId: zod_1.default.string().uuid().optional(),
    kpi: kpi_1.KpiSchema.partial().optional(),
    createdAt: zod_1.default.coerce.date().optional(),
    updatedAt: zod_1.default.coerce.date().optional(),
});

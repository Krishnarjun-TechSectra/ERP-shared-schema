"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInstanceSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const task_enum_1 = require("./task.enum");
exports.TaskInstanceSchema = zod_1.default.object({
    id: zod_1.default.string().uuid(),
    taskMasterId: zod_1.default.string().uuid(),
    status: zod_1.default.enum(task_enum_1.TaskStatusEnum).default(task_enum_1.TaskStatusEnum.TODO),
    deadline: zod_1.default.coerce.date(),
    completionDate: zod_1.default.coerce.date().nullable().optional(),
    proofOfCompletion: zod_1.default.string().nullable().optional(),
    createdAt: zod_1.default.coerce.date().optional(),
    updatedAt: zod_1.default.coerce.date().optional(),
});

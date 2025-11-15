"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusLabels = void 0;
const enums_1 = require("../enums");
exports.TaskStatusLabels = {
    [enums_1.TaskStatusEnum.TODO]: "To Do",
    [enums_1.TaskStatusEnum.IN_PROGRESS]: "In Progress",
    [enums_1.TaskStatusEnum.COMPLETED]: "Completed",
    [enums_1.TaskStatusEnum.OVERDUE]: "Overdue",
};

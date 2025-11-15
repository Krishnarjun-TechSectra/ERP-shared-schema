"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewTypeEnum = exports.RecurringFrequencyEnum = exports.TaskStatusEnum = exports.TaskPriorityEnum = void 0;
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

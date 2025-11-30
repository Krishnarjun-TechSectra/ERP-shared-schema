"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGoalDto = void 0;
const goal_schema_1 = require("../schemas/goal.schema");
exports.CreateGoalDto = goal_schema_1.GoalSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).strict();

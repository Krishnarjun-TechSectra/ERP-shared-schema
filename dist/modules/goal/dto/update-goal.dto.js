"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGoalDto = void 0;
const goal_schema_1 = require("../schemas/goal.schema");
exports.UpdateGoalDto = goal_schema_1.GoalSchema.partial().omit({
    id: true,
}).strict();

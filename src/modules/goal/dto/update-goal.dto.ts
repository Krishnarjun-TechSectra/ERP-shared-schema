import { z } from "zod";
import { GoalSchema } from "../schemas/goal.schema";

export const UpdateGoalDto = GoalSchema.partial().omit({
  id: true,
}).strict();

export type UpdateGoalDtoType = z.infer<typeof UpdateGoalDto>;

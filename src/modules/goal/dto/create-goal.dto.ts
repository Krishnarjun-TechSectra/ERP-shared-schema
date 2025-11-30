import { z } from "zod";
import { GoalSchema } from "../schemas/goal.schema";

export const CreateGoalDto = GoalSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

export type CreateGoalDtoType = z.infer<typeof CreateGoalDto>;

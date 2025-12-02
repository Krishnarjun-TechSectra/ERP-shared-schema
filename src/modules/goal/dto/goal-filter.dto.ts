import { z } from "zod";
import { GoalFilterSchema } from "../schemas/goal-filter.schema";

export const GoalFilterDto = GoalFilterSchema.strict();

export type GoalFilterDtoType = z.infer<typeof GoalFilterDto>;

import { z } from "zod";
import { GoalFilterSchema } from "../schemas/goal-filter.schema";
export type GoalFilterType = z.infer<typeof GoalFilterSchema>;

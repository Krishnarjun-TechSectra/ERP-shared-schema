import { z } from "zod";
import { GoalSchema } from "../schemas/goal.schema";

export type GoalType = z.infer<typeof GoalSchema>;

import { z } from "zod";
import { TaskFilterSchema } from "../schemas/filter-tasks.schema";

export const TaskFilterDto = TaskFilterSchema.strict();

export type TaskFilterDtoType = z.infer<typeof TaskFilterDto>;

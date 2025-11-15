import { z } from "zod";
import { TaskFilterSchema } from "../schemas/filter-tasks.schema";
export type TaskFilterType = z.infer<typeof TaskFilterSchema>;

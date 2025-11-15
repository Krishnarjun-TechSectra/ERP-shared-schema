import { z } from "zod";
import { UpdateTaskSchema } from "../schemas/update-task.schema";
export type UpdateTaskType = z.infer<typeof UpdateTaskSchema>;

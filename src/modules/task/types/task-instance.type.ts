import { z } from "zod";
import { TaskInstanceSchema } from "../schemas/task-instance.schema";

export type TaskInstanceType = z.infer<typeof TaskInstanceSchema>;

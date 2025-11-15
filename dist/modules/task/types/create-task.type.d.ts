import { z } from "zod";
import { CreateTaskSchema } from "../schemas";
export type CreateTaskType = z.infer<typeof CreateTaskSchema>;

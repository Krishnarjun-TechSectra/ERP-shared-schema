import { z } from "zod";
import { CreateTaskSchema } from "../schemas/create-task.schema";

export const CreateTaskDto = CreateTaskSchema.strict();

export type CreateTaskDtoType = z.infer<typeof CreateTaskDto>;

import { z } from "zod";
import { UpdateTaskSchema } from "../schemas/update-task.schema"; 

export const UpdateTaskDto = UpdateTaskSchema.strict();

export type UpdateTaskDtoType = z.infer<typeof UpdateTaskDto>;

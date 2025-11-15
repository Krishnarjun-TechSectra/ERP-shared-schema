import { z } from "zod";
import { TaskMasterSchema } from "../schemas/task-master.schema";
export type TaskMasterType = z.infer<typeof TaskMasterSchema>;

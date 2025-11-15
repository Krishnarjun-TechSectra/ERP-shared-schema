import { z } from "zod";
import { KpiSchema } from "../schemas/kpi.schema";

export const CreateKpiDto = KpiSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

export type CreateKpiDtoType = z.infer<typeof CreateKpiDto>;

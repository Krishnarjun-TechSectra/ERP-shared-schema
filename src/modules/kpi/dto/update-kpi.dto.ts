import { z } from "zod";
import { KpiSchema } from "../schemas/kpi.schema";

export const UpdateKpiDto = KpiSchema.partial().omit({
  id: true,
}).strict();

export type UpdateKpiDtoType = z.infer<typeof UpdateKpiDto>;

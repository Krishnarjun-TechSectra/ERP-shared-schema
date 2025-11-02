import { z } from "zod";

export const KpiSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  colorCode: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid hex color code")
    .nonempty("Color code is required"),
});

export const CreateKpiSchema = KpiSchema;

export const UpdateKpiSchema = KpiSchema.partial().describe("Update KPI");



export type Kpi = z.infer<typeof KpiSchema>;
export type CreateKpiDto = z.infer<typeof CreateKpiSchema>;
export type UpdateKpiDto = z.infer<typeof UpdateKpiSchema>;

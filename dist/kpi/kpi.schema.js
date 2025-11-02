// shared/kpi.schema.ts
import { z } from "zod";
import { createZodDto } from "nestjs-zod";
export const KpiSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().optional(),
    colorCode: z
        .string()
        .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid hex color code")
        .nonempty("Color code is required"),
});
export const CreateKpiSchema = KpiSchema;
export const UpdateKpiSchema = KpiSchema.partial();
// ✅ DTO classes for NestJS
export class CreateKpiDto extends createZodDto(CreateKpiSchema) {
}
export class UpdateKpiDto extends createZodDto(UpdateKpiSchema) {
}

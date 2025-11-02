import { z } from "zod";
export declare const KpiSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    colorCode: z.ZodString;
}, z.core.$strip>;
export declare const CreateKpiSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    colorCode: z.ZodString;
}, z.core.$strip>;
export declare const UpdateKpiSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    colorCode: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Kpi = z.infer<typeof KpiSchema>;
export type CreateKpiDto = z.infer<typeof CreateKpiSchema>;
export type UpdateKpiDto = z.infer<typeof UpdateKpiSchema>;

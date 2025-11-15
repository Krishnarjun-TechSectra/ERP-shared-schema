import { z } from "zod";
export declare const UpdateKpiDto: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    updatedAt: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    colorCode: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type UpdateKpiDtoType = z.infer<typeof UpdateKpiDto>;

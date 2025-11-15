import { z } from "zod";
export declare const CreateKpiDto: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    colorCode: z.ZodString;
}, z.core.$strict>;
export type CreateKpiDtoType = z.infer<typeof CreateKpiDto>;

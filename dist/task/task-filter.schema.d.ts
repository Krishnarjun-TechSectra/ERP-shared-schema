import { z } from "zod/v4";
export declare const ViewType: {
    readonly DAILY: "daily";
    readonly WEEKLY: "weekly";
    readonly MONTHLY: "monthly";
    readonly YEARLY: "yearly";
};
export declare const TaskFilterSchema: z.ZodObject<{
    assignTo: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<{
        readonly DAILY: "daily";
        readonly WEEKLY: "weekly";
        readonly MONTHLY: "monthly";
        readonly YEARLY: "yearly";
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type TaskFilterDto = z.infer<typeof TaskFilterSchema>;

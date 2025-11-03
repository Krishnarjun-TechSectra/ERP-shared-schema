import { z } from "zod/v4";
export declare const ViewType: {
    readonly DAILY: "daily";
    readonly WEEKLY: "weekly";
    readonly MONTHLY: "monthly";
    readonly YEARLY: "yearly";
};
export declare const TaskFilterSchema: z.ZodObject<{
    assignedTo: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<{
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
        yearly: "yearly";
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type TaskFilter = z.infer<typeof TaskFilterSchema>;
declare const TaskFilterDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    assignedTo: z.ZodOptional<z.ZodString>;
    viewType: z.ZodOptional<z.ZodEnum<{
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
        yearly: "yearly";
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class TaskFilterDto extends TaskFilterDto_base {
}
export {};

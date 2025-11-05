"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKpiSchema = exports.CreateKpiSchema = exports.KpiSchema = void 0;
// shared/kpi.schema.ts
const zod_1 = require("zod");
exports.KpiSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty("Title is required"),
    description: zod_1.z.string().optional(),
    colorCode: zod_1.z
        .string()
        .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid hex color code")
        .nonempty("Color code is required"),
});
exports.CreateKpiSchema = exports.KpiSchema;
exports.UpdateKpiSchema = exports.KpiSchema.partial();

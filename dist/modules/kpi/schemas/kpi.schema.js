"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../../core/constants");
exports.KpiSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID).optional(),
    title: zod_1.z
        .string()
        .min(1, constants_1.ErrorMessages.REQUIRED),
    description: zod_1.z.string().optional(),
    colorCode: zod_1.z
        .string()
        .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid hex color code")
        .min(1, constants_1.ErrorMessages.REQUIRED),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["updatedAt"],
            message: constants_1.ErrorMessages.INVALID_TIMESTAMPS,
        });
    }
});

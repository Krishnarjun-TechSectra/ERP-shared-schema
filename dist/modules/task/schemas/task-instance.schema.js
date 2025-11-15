"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInstanceSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../enums");
const constants_1 = require("../../../core/constants");
exports.TaskInstanceSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID),
    taskMasterId: zod_1.z.string().uuid(constants_1.ErrorMessages.INVALID_UUID),
    status: zod_1.z.nativeEnum(enums_1.TaskStatusEnum).default(enums_1.TaskStatusEnum.TODO),
    // ALWAYS required, even for recurring tasks
    deadline: zod_1.z.coerce.date({
        error: constants_1.ErrorMessages.INVALID_DATE,
    }),
    completionDate: zod_1.z.coerce
        .date({ error: constants_1.ErrorMessages.INVALID_DATE })
        .nullable()
        .optional(),
    proofOfCompletion: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    if (data.completionDate && data.completionDate > data.deadline) {
        ctx.addIssue({
            path: ["completionDate"],
            message: "Completion date cannot be after the deadline",
            code: zod_1.z.ZodIssueCode.custom,
        });
    }
    if (data.createdAt && data.updatedAt && data.updatedAt < data.createdAt) {
        ctx.addIssue({
            path: ["updatedAt"],
            message: constants_1.ErrorMessages.INVALID_TIMESTAMPS,
            code: zod_1.z.ZodIssueCode.custom,
        });
    }
});

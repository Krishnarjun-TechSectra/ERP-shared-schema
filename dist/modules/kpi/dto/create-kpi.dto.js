"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKpiDto = void 0;
const kpi_schema_1 = require("../schemas/kpi.schema");
exports.CreateKpiDto = kpi_schema_1.KpiSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).strict();

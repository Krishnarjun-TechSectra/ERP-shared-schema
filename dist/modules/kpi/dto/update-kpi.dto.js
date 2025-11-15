"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKpiDto = void 0;
const kpi_schema_1 = require("../schemas/kpi.schema");
exports.UpdateKpiDto = kpi_schema_1.KpiSchema.partial().omit({
    id: true,
}).strict();

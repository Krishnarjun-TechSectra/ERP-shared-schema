"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewTypeLabels = void 0;
const view_type_enum_1 = require("../enums/view-type.enum");
exports.ViewTypeLabels = {
    [view_type_enum_1.ViewTypeEnum.DAILY]: "Daily",
    [view_type_enum_1.ViewTypeEnum.WEEKLY]: "Weekly",
    [view_type_enum_1.ViewTypeEnum.MONTHLY]: "Monthly",
    [view_type_enum_1.ViewTypeEnum.YEARLY]: "Yearly",
};

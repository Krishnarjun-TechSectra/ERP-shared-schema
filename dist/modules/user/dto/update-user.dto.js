"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const user_schema_1 = require("../schemas/user.schema");
exports.UpdateUserDto = user_schema_1.UserSchema.partial().omit({
    id: true,
}).strict();

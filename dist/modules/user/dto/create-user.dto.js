"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const user_schema_1 = require("../schemas/user.schema");
exports.CreateUserDto = user_schema_1.UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).strict();

import { z } from "zod";
import { UserSchema } from "../schemas/user.schema";

export const UpdateUserDto = UserSchema.partial().omit({
  id: true,
}).strict();

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;

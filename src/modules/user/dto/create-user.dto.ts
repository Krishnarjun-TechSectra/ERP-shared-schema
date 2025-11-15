import { z } from "zod";
import { UserSchema } from "../schemas/user.schema";

export const CreateUserDto = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;

import { z } from "zod";
import { UserSchema } from "../schemas/user.schema";

export type UserType = z.infer<typeof UserSchema>;

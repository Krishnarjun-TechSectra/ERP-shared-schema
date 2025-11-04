import { z } from "zod";

/* -----------------------------------
   ENUM DEFINITIONS (human-readable)
------------------------------------*/

export enum RoleEnum {
  EMPLOYEE = "Employee",
  ADMIN = "Admin",
  DEVELOPER = "Developer",
}

/* -----------------------------------
   ZOD SCHEMA FOR ROLE FIELD
------------------------------------*/

export const RoleSchema = z.enum(RoleEnum);

export type RoleType = z.infer<typeof RoleSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(RoleEnum).default(RoleEnum.EMPLOYEE),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

/* CREATE DTO */
export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

/* UPDATE DTO */
export const UpdateUserSchema = UserSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
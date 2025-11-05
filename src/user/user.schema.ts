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
  role: z.enum(RoleEnum).default(RoleEnum.EMPLOYEE),
  kpiScore: z
    .number()
    .min(0, "The min value mus be greater than 0")
    .max(100, "The max value must be less that 100")
    .optional(),
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
export const UpdateUserSchema = UserSchema.partial().omit({ id: true });

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;

import * as z from 'zod';

const userSchema = z.object({
  name: z.string().min(1).max(255),
  password: z.string().min(8),
//   role: z.nativeEnum(UserRole).optional(),
});

export type UserInput = z.infer<typeof userSchema>;

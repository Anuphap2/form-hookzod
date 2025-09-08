import { z } from "zod";

export const mpSchema = z.object({
  prefix: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  photoUrl: z.string().optional(),
  history: z.string().optional(),
  achievement: z.string().optional(),
  position: z.string().optional(),
  ministry: z.string().optional(),
  party: z.string().min(1),
  province: z.string().min(1),
});

export type MP = z.infer<typeof mpSchema> & { id: string };

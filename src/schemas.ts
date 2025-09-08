import { z } from "zod";

export const mpSchema = z.object({
  prefix: z.string().min(1, "กรุณาใส่คำนำหน้า"),
  firstName: z.string().min(1, "กรุณาใส่ชื่อ"),
  lastName: z.string().min(1, "กรุณาใส่นามสกุล"),
  photoUrl: z.string().url("กรุณาใส่ URL รูปภาพที่ถูกต้อง"),
  history: z.string().optional(),
  achievement: z.string().optional(),
  position: z.string().optional(),
  ministry: z.string().optional(),
  party: z.string().min(1, "กรุณาใส่พรรค"),
  province: z.string().nullable().optional(),
});

import { z } from "zod";

export const mpSchema = z.object({
  prefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photoUrl: z.string().url("ลิงก์รูปไม่ถูกต้อง"),
  history: z.string().min(1, "กรุณากรอกประวัติการทำงาน"),
  achievement: z.string().min(1, "กรุณากรอกผลงานที่ผ่านมา"),
  position: z.string().min(1, "กรุณากรอกตำแหน่ง"),
  ministry: z.string().optional(),
  party: z.string().min(1, "กรุณากรอกพรรคการเมือง"),
  province: z.string().nullable().optional(), // 👈 เพิ่มตรงนี้
});

export type MPFormData = z.infer<typeof mpSchema>;

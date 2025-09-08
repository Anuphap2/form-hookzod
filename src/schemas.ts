import { z } from "zod";

export const mpSchema = z.object({
    prefix: z.string().min(2, "กรุณาเลือกคำนำหน้า"),
    firstName: z.string().min(2, "กรุณากรอกชื่อ"),
    lastName: z.string().min(2, "กรุณากรอกนามสกุล"),
    photoUrl: z.string().url("กรุณากรอก URL รูปภาพที่ถูกต้อง"),
    history: z.string().min(2, "กรุณากรอกประวัติ"),
    achievement: z.string().min(2, "กรุณากรอกผลงาน"),
    position: z.string().min(2, "กรุณากรอกตำแหน่ง"),
    ministry: z.string().min(2, "กรุณากรอกกระทรวง"),
    party: z.string().min(2, "กรุณากรอกพรรค"),
    province: z.string().optional(), // <-- แก้ตรงนี้

});

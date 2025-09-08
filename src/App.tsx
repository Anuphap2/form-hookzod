import { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { MP } from "./types";
import { mpSchema } from "./schemas";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Edit } from "lucide-react";

export default function App() {
  const [mps, setMps] = useState<MP[]>([
    {
      id: "1",
      prefix: "นาย",
      firstName: "อนุทิน",
      lastName: "ชาญวีรกูล",
      position: "นายกรัฐมนตรี",
      ministry: "กระทรวงมหาดไทย",
      party: "พรรคภูมิใจไทย",
      province: "กรุงเทพมหานคร",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new/3101203545367_5.jpg",
      history:
        "เคยดำรงตำแหน่งรองนายกรัฐมนตรีและรัฐมนตรีว่าการกระทรวงสาธารณสุข (2562–2566) และเป็นหัวหน้าพรรคภูมิใจไทย",
      achievement:
        "ผลักดันนโยบายกัญชาทางการแพทย์ และพัฒนาระบบสาธารณสุขช่วงการระบาดของโควิด-19",
    },
    {
      id: "2",
      prefix: "นาย",
      firstName: "สัมฤทธิ์",
      lastName: "แทนทรัพย์",
      position: "รัฐมนตรีว่าการ",
      ministry: "กระทรวงอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม",
      party: "พรรคภูมิใจไทย",
      province: "จังหวัดชัยภูมิ",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/cd626e26e543f304e1d9aa93254289da.png",
      history:
        "นักการเมืองจากจังหวัดชัยภูมิ สมาชิกพรรคภูมิใจไทย เคยทำงานด้านการศึกษาและวิทยาศาสตร์",
      achievement:
        "สนับสนุนโครงการวิจัยและพัฒนานวัตกรรมเพื่อเพิ่มศักยภาพประเทศ",
    },
    {
      id: "3",
      prefix: "นาย",
      firstName: "กรวีร์",
      lastName: "ปริศนานันทกุล",
      position: "รัฐมนตรีประจำสำนักนายกรัฐมนตรี",
      ministry: "",
      party: "พรรคภูมิใจไทย",
      province: "จังหวัดอ่างทอง",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/367fed0d5e472475b00d12b7f5c9fe01.png",
      history:
        "อดีตผู้บริหารฟุตบอลไทยลีก และเป็นสมาชิกสภาผู้แทนราษฎรจังหวัดอ่างทอง",
      achievement:
        "ขับเคลื่อนการปฏิรูปวงการกีฬาและสนับสนุนโครงการพัฒนาท้องถิ่น",
    },
    {
      id: "4",
      prefix: "นาย",
      firstName: "สุขสมรวย",
      lastName: "วันทนียกุล",
      position: "รัฐมนตรีประจำสำนักนายกรัฐมนตรี",
      ministry: "",
      party: "พรรคภูมิใจไทย",
      province: "จังหวัดอำนาจเจริญ",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/114f87369d48170bf20d4af1bb46ab72.png",
      history:
        "นักการเมืองรุ่นใหม่จากอำนาจเจริญ มีบทบาทในการพัฒนาพื้นที่ภาคตะวันออกเฉียงเหนือ",
      achievement: "ผลักดันโครงการสาธารณูปโภคพื้นฐานและการศึกษาในท้องถิ่น",
    },
    {
      id: "5",
      prefix: "นาย",
      firstName: "กฤษณ์",
      lastName: "ชีวะธรรมานนท์",
      position: "ส.ส.",
      ministry: "",
      party: "พรรคประชาชน",
      province: "จังหวัดชลบุรี",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/3f94d4714f4291ded8703c217361ac6e.png",
      history: "สมาชิกสภาผู้แทนราษฎรจังหวัดชลบุรี และนักธุรกิจท้องถิ่น",
      achievement: "สนับสนุนการพัฒนาเศรษฐกิจท้องถิ่นและการท่องเที่ยว",
    },
    {
      id: "6",
      prefix: "นาย",
      firstName: "กรุณพล",
      lastName: "เทียนสุวรรณ",
      position: "ส.ส.",
      ministry: "",
      party: "พรรคประชาชน",
      province: "กรุงเทพมหานคร",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/1cb4ee29bf8955ced230ca9d676cd14a.png",
      history: "อดีตนักแสดงและนักธุรกิจ หันเข้าสู่การเมืองในพรรคประชาชน",
      achievement: "เป็นกระบอกเสียงด้านสิ่งแวดล้อมและสิทธิมนุษยชน",
    },
    {
      id: "7",
      prefix: "นาย",
      firstName: "กฤช",
      lastName: "ศิลปชัย",
      position: "ส.ส.",
      ministry: "",
      party: "พรรคประชาชน",
      province: "จังหวัดระยอง",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/babcec9cd6fb7ffc35bc615d592c9b51.png",
      history:
        "สมาชิกสภาผู้แทนราษฎรจังหวัดระยอง มีบทบาทด้านการพัฒนาเศรษฐกิจภาคตะวันออก",
      achievement: "ผลักดันโครงการ EEC และการลงทุนในอุตสาหกรรมใหม่",
    },
    {
      id: "8",
      prefix: "นาย",
      firstName: "กฤดิทัช",
      lastName: "แสงธนโยธิน",
      position: "ส.ส.",
      ministry: "",
      party: "พรรคกล้าธรรม",
      province: "กรุงเทพมหานคร",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/f9aa2ac413db397d24adcd7cb6377e6e.png",
      history: "นักการเมืองสายก้าวหน้า เน้นด้านเศรษฐกิจดิจิทัลและนโยบายสังคม",
      achievement: "สนับสนุนนโยบายสตาร์ทอัพและการเปลี่ยนผ่านดิจิทัล",
    },
    {
      id: "9",
      prefix: "นาย",
      firstName: "อนุรักษ์",
      lastName: "จุรีมาศ",
      position: "รัฐมนตรีว่าการ",
      ministry: "กระทรวงพาณิชย์",
      party: "พรรคชาติไทยพัฒนา",
      province: "จังหวัดร้อยเอ็ด",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/8bb02922848f2de15e6c4af25cca53a7.png",
      history: "นักการเมืองจากจังหวัดร้อยเอ็ด สมาชิกพรรคชาติไทยพัฒนา",
      achievement: "ผลักดันการค้าระหว่างประเทศและการพัฒนาเกษตรกรรม",
    },
    {
      id: "10",
      prefix: "นาย",
      firstName: "อนุชา",
      lastName: "นาคาศัย",
      position:
        "รองนายกรัฐมนตรี, รัฐมนตรีว่าการกระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม",
      ministry: "",
      party: "พรรครวมไทยสร้างชาติ",
      province: "จังหวัดชัยนาท",
      photoUrl:
        "https://hris.parliament.go.th/manage/fileupload/pic_new_public/6a42209651e5d80a5492e983fc5dcde5.png",
      history:
        "นักการเมืองจากจังหวัดชัยนาท เคยดำรงตำแหน่งรัฐมนตรีประจำสำนักนายกรัฐมนตรี",
      achievement: "ผลักดันนโยบายด้านสิ่งแวดล้อมและการจัดการทรัพยากรธรรมชาติ",
    },
  ]);

  const [editData, setEditData] = useState<MP | null>(null);
  const [showForm, setShowForm] = useState(true); // true = form, false = list
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null); // ✅ ใช้แทน useState ใน map

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MP>({
    resolver: zodResolver(mpSchema),
    defaultValues: editData || {},
  });

  useEffect(() => {
    reset(editData || {});
    setPhotoPreview(editData?.photoUrl || null);
  }, [editData, reset]);

  const submitHandler = (data: MP) => {
    const mpData: MP = {
      ...data,
      id: editData?.id || Date.now().toString(),
      photoUrl: photoPreview || "",
    };

    if (editData) {
      setMps((prev) => prev.map((mp) => (mp.id === editData.id ? mpData : mp)));
      toast.success("แก้ไขเรียบร้อย!");
    } else {
      setMps((prev) => [...prev, mpData]);
      toast.success("เพิ่มสมาชิกเรียบร้อย!");
    }

    setEditData(null);
    setPhotoPreview(null);
    reset({
      prefix: "",
      firstName: "",
      lastName: "",
      photoUrl: "",
      history: "",
      achievement: "",
      position: "",
      ministry: "",
      party: "",
      province: "", // ถ้ามี field province
    });
    setShowForm(false);
  };

  const handleEdit = (mp: MP) => {
    setEditData(mp);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setMps((prev) => prev.filter((mp) => mp.id !== id));
    toast.success("ลบสมาชิกเรียบร้อย!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-4 sm:p-8 font-sans">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-gray-900">
        ทำเนียบรายชื่อสมาชิกสภาผู้แทนราษฎร
      </h1>

      {/* Toggle Form/List */}
      <div className="flex flex-col sm:flex-row justify-center mb-6 sm:mb-10 space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => setShowForm(true)}
          className={`px-5 py-2 rounded-full font-semibold shadow-md transition-colors cursor-pointer ${
            showForm
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:brightness-105`}
        >
          เพิ่มรายชื่อ
        </button>
        <button
          onClick={() => setShowForm(false)}
          className={`px-5 py-2 rounded-full font-semibold shadow-md transition-colors cursor-pointer ${
            !showForm
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:brightness-105`}
        >
          รายชื่อสมาชิกทั้งหมด
        </button>
      </div>

      {/* Form */}
      <div className={`${showForm ? "block animate-fadeIn" : "hidden"}`}>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="max-w-xl sm:max-w-3xl mx-auto space-y-4 sm:space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-200"
        >
          {/* Name */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <input
                {...register("prefix")}
                placeholder="คำนำหน้า"
                className="input w-full"
              />
              {errors.prefix && (
                <p className="text-red-500 text-sm">{errors.prefix.message}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                {...register("firstName")}
                placeholder="ชื่อ"
                className="input w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                {...register("lastName")}
                placeholder="นามสกุล"
                className="input w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Photo */}
          <div>
            <input
              type="file"
              accept="image/*"
              className="w-full text-gray-600 border-gray-300 rounded-xl px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition shadow-sm"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const base64 = reader.result as string;
                  setPhotoPreview(base64);
                  setValue("photoUrl", base64);
                };
                reader.readAsDataURL(file);
              }}
            />
            {photoPreview && (
              <div className="mt-3 sm:mt-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg mx-auto transition-transform hover:scale-105">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* History & Achievement */}
          <textarea
            {...register("history")}
            placeholder="ประวัติการทำงาน"
            className="w-full border-gray-300 border-2 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition resize-none shadow-sm"
            rows={3}
          />
          {errors.history && (
            <p className="text-red-500 text-sm">{errors.history.message}</p>
          )}

          <textarea
            {...register("achievement")}
            placeholder="ผลงานที่ผ่านมา"
            className="w-full border-gray-300 border-2 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition resize-none shadow-sm"
            rows={3}
          />
          {errors.achievement && (
            <p className="text-red-500 text-sm">{errors.achievement.message}</p>
          )}

          {/* Position / Ministry / Party */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              {...register("position")}
              placeholder="ตำแหน่งรัฐมนตรี"
              className="flex-1 input"
            />
            <input
              {...register("ministry")}
              placeholder="กระทรวง"
              className="flex-1 input"
            />
            <input
              {...register("party")}
              placeholder="สังกัดพรรค"
              className="flex-1 input"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer text-white py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-shadow shadow-lg"
          >
            {editData ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก"}
          </button>
        </form>
      </div>

      {/* List */}
      <div
        className={`${
          !showForm ? "block animate-fadeIn" : "hidden"
        } max-w-6xl mx-auto mt-6`}
      >
        {mps.length === 0 ? (
          <p className="text-center text-gray-500 mt-6 text-lg">
            ไม่มีข้อมูลสมาชิก
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
            {mps.map((mp) => (
              <div
                key={mp.id}
                className="bg-white rounded-3xl shadow-2xl p-5 sm:p-6 flex flex-col items-center text-center transition-all border border-gray-200 hover:scale-105"
              >
                {/* รูป */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gray-300 mb-3 sm:mb-4 shadow-lg">
                  {mp.photoUrl ? (
                    <img
                      src={mp.photoUrl}
                      alt={mp.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      ไม่มีรูป
                    </div>
                  )}
                </div>

                {/* ชื่อ */}
                <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                  {mp.prefix} {mp.firstName} {mp.lastName}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {mp.position}
                </p>
                {mp.ministry && (
                  <p className="text-sm sm:text-base text-gray-500">
                    {mp.ministry}
                  </p>
                )}
                <p className="text-sm sm:text-base text-gray-500 mb-2 sm:mb-3">
                  {mp.party}
                </p>

                {/* ปุ่มแสดงรายละเอียด */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === mp.id ? null : mp.id)
                  }
                  className="text-blue-500 hover:text-blue-600 font-medium mb-3 transition cursor-pointer hover:underline"
                  aria-label={`${
                    expandedId === mp.id ? "ซ่อนรายละเอียด" : "ดูรายละเอียด"
                  } ของ ${mp.firstName}`}
                >
                  {expandedId === mp.id ? "ซ่อนรายละเอียด" : "ดูรายละเอียด"}
                </button>

                {/* ประวัติ + ผลงาน */}
                {expandedId === mp.id && (
                  <div className="text-left w-full bg-gray-50 p-3 rounded-xl shadow-inner mb-3">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">ประวัติการทำงาน:</span>{" "}
                      {mp.history || "ไม่มีข้อมูล"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">ผลงานที่ผ่านมา:</span>{" "}
                      {mp.achievement || "ไม่มีข้อมูล"}
                    </p>
                  </div>
                )}

                {/* ปุ่ม Edit / Delete */}
                <div className="flex gap-4 sm:gap-6 mt-auto">
                  <button
                    onClick={() => handleEdit(mp)}
                    className="text-yellow-500 hover:text-yellow-600 transition cursor-pointer"
                    aria-label={`แก้ไข ${mp.firstName}`}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(mp.id)}
                    className="text-red-500 hover:text-red-600 transition cursor-pointer"
                    aria-label={`ลบ ${mp.firstName}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

import { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // type-only importimport { zodResolver } from "@hookform/resolvers/zod";
import type { MP } from "./types";
import { mpSchema } from "./schemas";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Edit } from "lucide-react";

export default function App() {
  const [mps, setMps] = useState<MP[]>([
    /* ข้อมูลเดิม */
  ]);
  const [editData, setEditData] = useState<MP | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const submitHandler: SubmitHandler<MP> = (data) => {
    const newMP: MP = {
      ...data,
      id: editData?.id || Date.now().toString(),
      photoUrl: photoPreview || "",
    };

    if (editData) {
      setMps((prev) => prev.map((mp) => (mp.id === editData.id ? newMP : mp)));
      toast.success("แก้ไขเรียบร้อย!");
    } else {
      setMps((prev) => [...prev, newMP]);
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
      province: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      setValue("photoUrl", base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-4 sm:p-8 font-sans">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-gray-900">
        ทำเนียบรายชื่อสมาชิกสภาผู้แทนราษฎร
      </h1>

      {/* Toggle */}
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
      {showForm && (
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="max-w-xl sm:max-w-3xl mx-auto space-y-4 sm:space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-200"
        >
          {/* Name */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              {...register("prefix")}
              placeholder="คำนำหน้า"
              className="input flex-1"
            />
            <input
              {...register("firstName")}
              placeholder="ชื่อ"
              className="input flex-1"
            />
            <input
              {...register("lastName")}
              placeholder="นามสกุล"
              className="input flex-1"
            />
          </div>
          {errors.prefix && (
            <p className="text-red-500 text-sm">{errors.prefix.message}</p>
          )}
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}

          {/* Photo */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {photoPreview && (
            <div className="mt-3 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg mx-auto">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* History & Achievement */}
          <textarea
            {...register("history")}
            placeholder="ประวัติการทำงาน"
            className="input w-full"
            rows={3}
          />
          <textarea
            {...register("achievement")}
            placeholder="ผลงานที่ผ่านมา"
            className="input w-full"
            rows={3}
          />

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
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-2xl font-semibold"
          >
            {editData ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก"}
          </button>
        </form>
      )}

      {/* List */}
      {!showForm && (
        <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mps.length === 0 && (
            <p className="text-center text-gray-500">ไม่มีข้อมูลสมาชิก</p>
          )}
          {mps.map((mp) => (
            <div
              key={mp.id}
              className="bg-white rounded-3xl shadow-2xl p-5 flex flex-col items-center text-center border border-gray-200 hover:scale-105"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gray-300 mb-3 shadow-lg">
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
              <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                {mp.prefix} {mp.firstName} {mp.lastName}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {mp.position}
              </p>
              {mp.ministry && (
                <p className="text-sm sm:text-base text-gray-500">
                  {mp.ministry}
                </p>
              )}
              <p className="text-sm sm:text-base text-gray-500 mb-2">
                {mp.party}
              </p>
              <button
                onClick={() =>
                  setExpandedId(expandedId === mp.id ? null : mp.id)
                }
                className="text-blue-500 hover:underline"
              >
                {expandedId === mp.id ? "ซ่อนรายละเอียด" : "ดูรายละเอียด"}
              </button>
              {expandedId === mp.id && (
                <div className="text-left w-full bg-gray-50 p-3 rounded-xl shadow-inner mb-3">
                  <p>
                    <strong>ประวัติการทำงาน:</strong>{" "}
                    {mp.history || "ไม่มีข้อมูล"}
                  </p>
                  <p>
                    <strong>ผลงานที่ผ่านมา:</strong>{" "}
                    {mp.achievement || "ไม่มีข้อมูล"}
                  </p>
                </div>
              )}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={() => handleEdit(mp)}
                  className="text-yellow-500"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(mp.id)}
                  className="text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

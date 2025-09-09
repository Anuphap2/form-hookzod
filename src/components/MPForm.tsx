import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { MP } from "../types";
import { mpSchema } from "../schemas";

type MPFormProps = {
  editData: MP | null;
  onSubmit: (data: Omit<MP, "id">, photoUrl: string | null) => void;
};

export default function MPForm({ editData, onSubmit }: MPFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Omit<MP, "id">>({
    resolver: zodResolver(mpSchema),
    defaultValues: editData || {
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
    },
  });

  useEffect(() => {
    reset(editData || {});
    setPhotoPreview(editData?.photoUrl || null);
  }, [editData, reset]);

  const submitHandler = (data: Omit<MP, "id">) => {
    onSubmit(data, photoPreview);
    reset();
    setPhotoPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-xl sm:max-w-3xl mx-auto space-y-4 sm:space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-200"
    >
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
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            {...register("lastName")}
            placeholder="นามสกุล"
            className="input w-full"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
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
  );
}

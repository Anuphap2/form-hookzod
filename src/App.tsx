import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import type { MP } from "./types";
import { initialMps } from "./data";
import MPForm from "./components/MPForm";
import MPTable from "./components/MPCard";
import "./App.css";

export default function App() {
  const [mps, setMps] = useState<MP[]>(initialMps);
  const [editData, setEditData] = useState<MP | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (data: Omit<MP, "id">, photoUrl: string | null) => {
    const mpData: MP = {
      ...data,
      id: editData?.id || Date.now().toString(),
      photoUrl: photoUrl || "",
    };
    if (editData) {
      setMps((prev) => prev.map((mp) => (mp.id === editData.id ? mpData : mp)));
      toast.success("แก้ไขเรียบร้อย!");
    } else {
      setMps((prev) => [...prev, mpData]);
      toast.success("เพิ่มสมาชิกเรียบร้อย!");
    }
    setEditData(null);
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

      <div className="flex justify-center mb-6 sm:mb-10 space-x-4">
        <button
          onClick={() => setShowForm(true)}
          className={`px-5 py-2 rounded-full font-semibold shadow-md ${
            showForm ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          เพิ่มรายชื่อ
        </button>
        <button
          onClick={() => setShowForm(false)}
          className={`px-5 py-2 rounded-full font-semibold shadow-md ${
            !showForm ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          รายชื่อสมาชิกทั้งหมด
        </button>
      </div>

      {showForm && <MPForm editData={editData} onSubmit={handleSubmit} />}

      {!showForm && (
        <div className="mt-6">
          <MPTable mps={mps} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

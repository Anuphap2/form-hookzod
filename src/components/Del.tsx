import { useState } from "react";
import { Trash2 } from "lucide-react";

type DeleteButtonProps = {
  mpId: string;
  mpName: string;
  onDelete: (id: string) => void;
};

export default function DeleteButton({ mpId, mpName, onDelete }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ปุ่มลบ */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="text-red-500 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4">ยืนยันการลบ</h2>
            <p className="mb-6 text-gray-700">คุณต้องการลบ <span className="font-bold">{mpName}</span> ใช่หรือไม่?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onDelete(mpId);
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
              >
                ลบ
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

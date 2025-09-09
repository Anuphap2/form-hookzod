import React, { useState, useMemo } from "react";
import type { MP } from "../types";
import { Edit, ChevronDown, ChevronUp } from "lucide-react";
import DeleteButton from "./Del";

type MPTableProps = {
  mps: MP[];
  onEdit: (mp: MP) => void;
  onDelete: (id: string) => void;
};

type SortConfig = { key: keyof MP; direction: "asc" | "desc" };

export default function MPTable({ mps, onEdit, onDelete }: MPTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filter & Search
  const filteredMps = useMemo(() => {
    return mps.filter((mp) =>
      `${mp.firstName} ${mp.lastName} ${mp.position} ${mp.party}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [mps, search]);

  // Sort
  const sortedMps = useMemo(() => {
    if (!sortConfig) return filteredMps;
    return [...filteredMps].sort((a, b) => {
      const aVal = a[sortConfig.key] || "";
      const bVal = b[sortConfig.key] || "";
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [filteredMps, sortConfig]);

  // Pagination
  const pageCount = Math.ceil(sortedMps.length / itemsPerPage);
  const paginatedMps = sortedMps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof MP) => {
    if (sortConfig?.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else setSortConfig({ key, direction: "asc" });
  };

  const renderSortIcon = (key: keyof MP) => {
    if (sortConfig?.key !== key)
      return <ChevronDown size={14} className="opacity-30" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Search */}
      <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
        <input
          type="text"
          placeholder="ค้นหา..."
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">รูป</th>
            <th
              className="py-3 px-4 text-left cursor-pointer select-none"
              onClick={() => handleSort("firstName")}
            >
              ชื่อ-นามสกุล {renderSortIcon("firstName")}
            </th>
            <th
              className="py-3 px-4 text-left cursor-pointer select-none"
              onClick={() => handleSort("position")}
            >
              ตำแหน่ง {renderSortIcon("position")}
            </th>
            <th className="py-3 px-4 text-left">กระทรวง</th>
            <th className="py-3 px-4 text-left">พรรค</th>

            <th className="py-3 px-4 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMps.map((mp) => (
            <React.Fragment key={mp.id}>
              <tr
                className="border-t border-gray-200 hover:bg-blue-50 transition-all cursor-pointer"
                onClick={() =>
                  setExpandedId(expandedId === mp.id ? null : mp.id)
                }
              >
                <td className="py-2 px-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 shadow-sm">
                    {mp.photoUrl ? (
                      <img
                        src={mp.photoUrl}
                        alt={mp.firstName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        ไม่มีรูป
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 font-medium text-gray-800">
                  {mp.prefix} {mp.firstName} {mp.lastName}
                </td>
                <td className="py-2 px-4 text-gray-700">{mp.position}</td>
                <td className="py-2 px-4 text-gray-600">
                  {mp.ministry || "-"}
                </td>
                <td className="py-2 px-4 text-gray-700">{mp.party}</td>
                <td className="py-2 px-4 flex justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(mp);
                    }}
                    className="bg-yellow-100 p-2 rounded-lg hover:bg-yellow-200 transition shadow-sm"
                  >
                    <Edit size={18} />
                  </button>

                  <DeleteButton
                    mpId={mp.id}
                    mpName={`${mp.firstName} ${mp.lastName}`}
                    onDelete={onDelete}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(expandedId === mp.id ? null : mp.id);
                    }}
                    className="p-1 rounded hover:bg-gray-200 transition"
                  >
                    {expandedId === mp.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </td>
              </tr>

              {expandedId === mp.id && (
                <tr className="bg-blue-50">
                  <td colSpan={7} className="py-2 px-4">
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>
                        <span className="font-semibold">ประวัติการทำงาน:</span>{" "}
                        {mp.history || "ไม่มีข้อมูล"}
                      </p>
                      <p>
                        <span className="font-semibold">ผลงานที่ผ่านมา:</span>{" "}
                        {mp.achievement || "ไม่มีข้อมูล"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-1 rounded-lg border transition ${
              currentPage === num
                ? "bg-blue-500 text-white shadow"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

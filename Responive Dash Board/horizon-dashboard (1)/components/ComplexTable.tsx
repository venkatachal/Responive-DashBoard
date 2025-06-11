"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { ComplexTableRow } from "@/hooks/useRealTimeData"

interface ComplexTableProps {
  data: ComplexTableRow[]
  onAdd: (row: Omit<ComplexTableRow, "id">) => void
  onUpdate: (id: string, updates: Partial<ComplexTableRow>) => void
  onDelete: (id: string) => void
}

export default function ComplexTable({ data, onAdd, onUpdate, onDelete }: ComplexTableProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<ComplexTableRow, "id">>({
    name: "",
    status: "Approved",
    progress: 0,
    date: "",
    category: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500"
      case "Disable":
        return "bg-orange-500"
      case "Error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleSubmit = () => {
    if (editingId) {
      onUpdate(editingId, formData)
    } else {
      onAdd(formData)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      status: "Approved",
      progress: 0,
      date: "",
      category: "",
    })
    setShowAddForm(false)
    setEditingId(null)
  }

  const startEdit = (row: ComplexTableRow) => {
    setEditingId(row.id)
    setFormData({
      name: row.name,
      status: row.status,
      progress: row.progress,
      date: row.date,
      category: row.category,
    })
    setShowAddForm(true)
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 h-fit">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-white text-base sm:text-lg font-semibold">Complex Table</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="p-2 text-purple-400 hover:text-purple-300 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="mb-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ComplexTableRow["status"] })}
              className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            >
              <option value="Approved">Approved</option>
              <option value="Disable">Disable</option>
              <option value="Error">Error</option>
            </select>
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            />
            <input
              type="number"
              placeholder="Progress"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded transition-colors"
            >
              {editingId ? "Update" : "Add"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-slate-400 text-xs font-medium px-2 sm:px-0 sticky top-0 bg-slate-800/50 py-2">
          <div>NAME</div>
          <div>STATUS</div>
          <div className="hidden sm:block">DATE</div>
          <div>PROGRESS</div>
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 gap-2 sm:gap-4 items-center py-2 px-2 sm:px-0 group hover:bg-slate-700/20 rounded-lg transition-colors"
          >
            <div className="text-white text-sm font-medium truncate pr-2">{item.name}</div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)} flex-shrink-0`}></div>
              <span className="text-slate-300 text-xs sm:text-sm truncate">{item.status}</span>
            </div>
            <div className="text-slate-300 text-xs hidden sm:block truncate">{item.date}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
                <div className="flex-1 bg-slate-700 rounded-full h-1">
                  <div
                    className="bg-purple-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <span className="text-slate-300 text-xs flex-shrink-0">{item.progress}%</span>
              </div>
              <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(item)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

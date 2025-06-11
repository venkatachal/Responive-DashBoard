"use client"

import { useState } from "react"
import { Edit, Trash2, Plus } from "lucide-react"
import type { TableRow } from "@/hooks/useRealTimeData"

interface DataTableProps {
  data: TableRow[]
  onAdd: (row: Omit<TableRow, "id">) => void
  onUpdate: (id: string, updates: Partial<TableRow>) => void
  onDelete: (id: string) => void
}

export default function DataTable({ data, onAdd, onUpdate, onDelete }: DataTableProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<TableRow, "id">>({
    name: "",
    progress: 0,
    quantity: 0,
    date: "",
    status: "Approved",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/20 text-green-400"
      case "Disable":
        return "bg-gray-500/20 text-gray-400"
      case "Error":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
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
      progress: 0,
      quantity: 0,
      date: "",
      status: "Approved",
    })
    setShowAddForm(false)
    setEditingId(null)
  }

  const startEdit = (row: TableRow) => {
    setEditingId(row.id)
    setFormData({
      name: row.name,
      progress: row.progress,
      quantity: row.quantity,
      date: row.date,
      status: row.status,
    })
    setShowAddForm(true)
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 h-fit">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-white text-base sm:text-lg font-semibold">Check Table</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="p-2 text-purple-400 hover:text-purple-300 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button className="text-purple-400 text-sm hover:text-purple-300 hidden sm:inline">See all</button>
        </div>
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
            <input
              type="number"
              placeholder="Progress"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
              className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as TableRow["status"] })}
              className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            >
              <option value="Approved">Approved</option>
              <option value="Disable">Disable</option>
              <option value="Error">Error</option>
            </select>
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

      {/* Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 text-xs font-medium pb-3 px-2">NAME</th>
                <th className="text-left text-slate-400 text-xs font-medium pb-3 px-2">PROGRESS</th>
                <th className="text-left text-slate-400 text-xs font-medium pb-3 px-2">QUANTITY</th>
                <th className="text-left text-slate-400 text-xs font-medium pb-3 px-2">STATUS</th>
                <th className="text-left text-slate-400 text-xs font-medium pb-3 px-2">ACTIONS</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="max-h-64 overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-slate-600 bg-slate-700 w-4 h-4" />
                        <span className="text-white font-medium text-sm truncate max-w-[120px]">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${row.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-300 text-xs">{row.progress.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-slate-300 text-sm">{row.quantity.toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => startEdit(row)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDelete(row.id)}
                          className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

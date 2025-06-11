"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface TableData {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
  joinDate: string
}

export default function TablesPage() {
  const [data, setData] = useState<TableData[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      status: "Active",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      status: "Active",
      joinDate: "2023-02-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Manager",
      status: "Inactive",
      joinDate: "2023-03-10",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<TableData, "id">>({
    name: "",
    email: "",
    role: "",
    status: "Active",
    joinDate: "",
  })

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = () => {
    const newItem: TableData = {
      ...formData,
      id: Date.now().toString(),
    }
    setData([...data, newItem])
    resetForm()
  }

  const handleEdit = (item: TableData) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      email: item.email,
      role: item.role,
      status: item.status,
      joinDate: item.joinDate,
    })
    setShowCreateForm(true)
  }

  const handleUpdate = () => {
    if (editingId) {
      setData(data.map((item) => (item.id === editingId ? { ...formData, id: editingId } : item)))
      resetForm()
    }
  }

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      status: "Active",
      joinDate: "",
    })
    setShowCreateForm(false)
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Data Tables</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-white text-lg font-semibold mb-4">{editingId ? "Edit Entry" : "Create New Entry"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2"
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={editingId ? handleUpdate : handleCreate}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              {editingId ? "Update" : "Create"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left text-slate-300 font-medium px-6 py-4">Name</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">Email</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">Role</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">Status</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">Join Date</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-t border-slate-700/50 hover:bg-slate-700/25">
                  <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-slate-300">{item.email}</td>
                  <td className="px-6 py-4 text-slate-300">{item.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{item.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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
  )
}

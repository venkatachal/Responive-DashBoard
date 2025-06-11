"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  location: string
  role: string
  bio: string
}

export default function ProfilePage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([
    {
      id: "1",
      name: "Adela Parkson",
      email: "adela@horizon.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      role: "Creative Director",
      bio: "Passionate about creating beautiful and functional designs.",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<UserProfile | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState<Omit<UserProfile, "id">>({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    bio: "",
  })

  const startEdit = (profile: UserProfile) => {
    setEditingId(profile.id)
    setEditForm({ ...profile })
  }

  const saveEdit = () => {
    if (editForm) {
      setProfiles(profiles.map((p) => (p.id === editForm.id ? editForm : p)))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const createProfile = () => {
    const newProfile: UserProfile = {
      ...createForm,
      id: Date.now().toString(),
    }
    setProfiles([...profiles, newProfile])
    setCreateForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      role: "",
      bio: "",
    })
    setShowCreateForm(false)
  }

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">User Profiles</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
        >
          Create Profile
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-white text-lg font-semibold mb-4">Create New Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={createForm.name}
              onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={createForm.email}
              onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={createForm.phone}
              onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
            />
            <input
              type="text"
              placeholder="Location"
              value={createForm.location}
              onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
            />
            <input
              type="text"
              placeholder="Role"
              value={createForm.role}
              onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
            />
            <textarea
              placeholder="Bio"
              value={createForm.bio}
              onChange={(e) => setCreateForm({ ...createForm, bio: e.target.value })}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 md:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={createProfile}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Profile Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            {editingId === profile.id && editForm ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  rows={3}
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={saveEdit}
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold">{profile.name}</h3>
                      <p className="text-purple-400 text-sm">{profile.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => startEdit(profile)}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProfile(profile.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-3">{profile.bio}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

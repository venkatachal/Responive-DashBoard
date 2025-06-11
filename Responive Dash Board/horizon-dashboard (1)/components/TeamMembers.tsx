"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, X, Send } from "lucide-react"
import type { TeamMember } from "@/hooks/useRealTimeData"

interface TeamMembersProps {
  members: TeamMember[]
  onAdd: (member: Omit<TeamMember, "id">) => void
  onUpdate: (id: string, updates: Partial<TeamMember>) => void
  onDelete: (id: string) => void
}

interface Message {
  id: string
  text: string
  timestamp: Date
  sender: "user" | "member"
}

export default function TeamMembers({ members, onAdd, onUpdate, onDelete }: TeamMembersProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    avatar: "👤",
    status: "online",
    joinDate: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleSubmit = () => {
    if (formData.name && formData.role) {
      onAdd({
        ...formData,
        joinDate: formData.joinDate || new Date().toISOString().split("T")[0],
      })
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      avatar: "👤",
      status: "online",
      joinDate: "",
    })
    setShowAddForm(false)
  }

  const openMessageModal = (member: TeamMember) => {
    setSelectedMember(member)
    setShowMessageModal(true)
  }

  const closeMessageModal = () => {
    setShowMessageModal(false)
    setSelectedMember(null)
    setMessageText("")
  }

  const sendMessage = () => {
    if (messageText.trim() && selectedMember) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        timestamp: new Date(),
        sender: "user",
      }

      setMessages((prev) => ({
        ...prev,
        [selectedMember.id]: [...(prev[selectedMember.id] || []), newMessage],
      }))

      // Simulate member response after 1 second
      setTimeout(() => {
        const responses = [
          "Thanks for reaching out!",
          "I'll get back to you soon.",
          "Got it, working on it now.",
          "Thanks for the update!",
          "Let me check and get back to you.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const memberResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          timestamp: new Date(),
          sender: "member",
        }

        setMessages((prev) => ({
          ...prev,
          [selectedMember.id]: [...(prev[selectedMember.id] || []), memberResponse],
        }))
      }, 1000)

      setMessageText("")
    }
  }

  const memberMessages = selectedMember ? messages[selectedMember.id] || [] : []

  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 h-fit">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-white text-base sm:text-lg font-semibold">Team members</h3>
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

        {/* Add Member Form */}
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
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TeamMember["status"] })}
                className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              >
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
              </select>
              <input
                type="text"
                placeholder="Avatar (emoji)"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded transition-colors"
              >
                Add Member
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

        {/* Members List */}
        <div className="space-y-3 sm:space-y-4 max-h-80 overflow-y-auto">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between group p-2 sm:p-3 rounded-lg hover:bg-slate-700/20 transition-colors"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-sm sm:text-lg">
                    {member.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-slate-800 ${getStatusColor(
                      member.status,
                    )}`}
                  ></div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium text-sm truncate">{member.name}</p>
                  <p className="text-slate-400 text-xs truncate">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => openMessageModal(member)}
                  className="px-2 py-1 sm:px-3 sm:py-1 bg-purple-500 hover:bg-purple-600 text-white text-xs rounded transition-colors"
                >
                  Message
                </button>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() =>
                      onUpdate(member.id, {
                        status: member.status === "online" ? "offline" : "online",
                      })
                    }
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDelete(member.id)}
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

      {/* Message Modal */}
      {showMessageModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-lg">
                    {selectedMember.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${getStatusColor(
                      selectedMember.status,
                    )}`}
                  ></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{selectedMember.name}</h3>
                  <p className="text-slate-400 text-sm">{selectedMember.role}</p>
                </div>
              </div>
              <button
                onClick={closeMessageModal}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0">
              {memberMessages.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  <p>No messages yet. Start a conversation!</p>
                </div>
              ) : (
                memberMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.sender === "user" ? "bg-purple-500 text-white" : "bg-slate-700 text-slate-200"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="p-2 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

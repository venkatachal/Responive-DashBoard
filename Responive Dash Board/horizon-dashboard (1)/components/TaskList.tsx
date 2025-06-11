"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { Task } from "@/hooks/useRealTimeData"

interface TaskListProps {
  tasks: Task[]
  onAdd: (task: Omit<Task, "id">) => void
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onAdd, onUpdate, onDelete }: TaskListProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-slate-400"
    }
  }

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAdd({
        title: newTaskTitle,
        completed: false,
        priority: "medium",
        assignee: "Unassigned",
        dueDate: new Date().toISOString().split("T")[0],
      })
      setNewTaskTitle("")
      setShowAddForm(false)
    }
  }

  const toggleTask = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      onUpdate(id, { completed: !task.completed })
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 h-fit">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-white text-base sm:text-lg font-semibold">Tasks</h3>
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-sm">{tasks.filter((t) => !t.completed).length} remaining</span>
          <button
            onClick={() => setShowAddForm(true)}
            className="p-2 text-purple-400 hover:text-purple-300 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="mb-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm mb-2"
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          />
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddTask}
              className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setNewTaskTitle("")
              }}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-700/20 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-500 focus:ring-2 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span
                  className={`block text-sm truncate ${task.completed ? "text-slate-500 line-through" : "text-white"}`}
                >
                  {task.title}
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-slate-500 text-xs truncate">{task.assignee}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button
                onClick={() => onUpdate(task.id, { priority: task.priority === "high" ? "low" : "high" })}
                className="p-1 text-slate-400 hover:text-white"
              >
                <Edit className="w-3 h-3" />
              </button>
              <button onClick={() => onDelete(task.id)} className="p-1 text-slate-400 hover:text-red-400">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

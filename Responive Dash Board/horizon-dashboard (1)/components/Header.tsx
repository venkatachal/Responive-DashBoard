"use client"

import { useState } from "react"
import { Search, Bell, Settings, LogOut, X } from "lucide-react"

interface HeaderProps {
  currentUser?: {
    id: string
    name: string
    email: string
    password: string
    role: string
    avatar: string
    joinDate: string
  }
  onSignOut?: () => void
  onNavigate?: (section: string) => void
  onSearch?: (query: string) => void
}

export default function Header({ currentUser, onSignOut, onNavigate, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const searchableItems = [
    { name: "Dashboard", section: "dashboard", keywords: ["dashboard", "home", "main", "overview"] },
    { name: "Team Members", section: "dashboard", keywords: ["team", "members", "people", "staff", "colleagues"] },
    { name: "Tasks", section: "dashboard", keywords: ["tasks", "todo", "assignments", "work"] },
    { name: "Calendar", section: "dashboard", keywords: ["calendar", "dates", "schedule", "events"] },
    { name: "Revenue Chart", section: "dashboard", keywords: ["revenue", "chart", "money", "income", "sales"] },
    { name: "Daily Traffic", section: "dashboard", keywords: ["traffic", "visitors", "users", "analytics"] },
    { name: "Check Table", section: "dashboard", keywords: ["check", "table", "data", "list"] },
    { name: "Complex Table", section: "dashboard", keywords: ["complex", "table", "advanced", "data"] },
    { name: "Starbucks", section: "dashboard", keywords: ["starbucks", "coffee", "rewards", "points"] },
    { name: "Profile", section: "profile", keywords: ["profile", "user", "account", "personal"] },
    { name: "Tables", section: "tables", keywords: ["tables", "data", "records", "database"] },
    { name: "Settings", section: "settings", keywords: ["settings", "preferences", "config", "options"] },
    { name: "Rewards", section: "rewards", keywords: ["rewards", "redeem", "points", "benefits"] },
    { name: "Payment", section: "payment", keywords: ["payment", "pay", "billing", "checkout"] },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      setShowSearchResults(true)
      if (onSearch) {
        onSearch(query)
      }
    } else {
      setShowSearchResults(false)
    }
  }

  const handleSearchSelect = (section: string) => {
    if (onNavigate) {
      onNavigate(section)
    }
    setSearchQuery("")
    setShowSearchResults(false)
  }

  const filteredResults = searchableItems.filter((item) =>
    item.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSettingsClick = () => {
    if (onNavigate) {
      onNavigate("settings")
    }
  }

  return (
    <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Main Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setShowSearchResults(false)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search Results Dropdown */}
            {showSearchResults && filteredResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                {filteredResults.slice(0, 8).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchSelect(item.section)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-b-0"
                  >
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-slate-400 text-sm">Navigate to {item.name.toLowerCase()} section</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </button>

          <button onClick={handleSettingsClick} className="p-2 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {currentUser && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">{currentUser.avatar}</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-white text-sm font-medium">{currentUser.name}</span>
                <p className="text-slate-400 text-xs">{currentUser.role}</p>
              </div>
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

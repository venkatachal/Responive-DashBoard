"use client"

import { Home, ShoppingBag, Table, Kanban, User, BarChart3, Lock } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Main Dashboard", icon: Home },
    { id: "nft", label: "NFT Marketplace", icon: ShoppingBag },
    { id: "tables", label: "Tables", icon: Table },
    { id: "kanban", label: "Kanban", icon: Kanban },
    { id: "profile", label: "Profile", icon: User },
    { id: "signin", label: "Sign In", icon: Lock },
  ]

  return (
    <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <div>
            <span className="text-white font-semibold">HORIZON</span>
            <span className="text-purple-400 text-sm ml-1">FREE</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <p className="text-white text-sm font-medium mb-2">Upgrade to PRO</p>
          <p className="text-white/80 text-xs mb-3">
            Improve your development process and start doing more with Horizon UI PRO!
          </p>
          <button className="w-full bg-white text-purple-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Get Pro Now
          </button>
        </div>
      </div>
    </div>
  )
}

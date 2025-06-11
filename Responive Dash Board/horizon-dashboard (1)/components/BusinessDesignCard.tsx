"use client"

import { Clock, Play, Flame } from "lucide-react"

interface BusinessDesignCardProps {
  onNavigate?: (section: string) => void
}

export default function BusinessDesignCard({ onNavigate }: BusinessDesignCardProps) {
  const avatars = ["👨‍💼", "👩‍💻", "👨‍🎨", "👩‍🔬", "👨‍💻", "👩‍💼"]

  const handleGetStarted = () => {
    if (onNavigate) {
      onNavigate("business-design")
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 max-w-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-indigo-900/80 rounded-xl"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon and category */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <div className="text-slate-300 text-sm font-medium">Business Design</div>
            <div className="text-slate-400 text-xs">New lession is available</div>
          </div>
        </div>

        {/* Main heading */}
        <h3 className="text-white text-xl font-bold leading-tight mb-8">
          What do you need to know to create better products?
        </h3>

        {/* Info items */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-white text-sm font-medium">85 mins</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 text-orange-400" />
            </div>
            <span className="text-white text-sm font-medium">Video format</span>
          </div>
        </div>

        {/* Bottom section with avatars and button */}
        <div className="flex items-center justify-between">
          {/* Avatar stack */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {avatars.slice(0, 4).map((avatar, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-2 border-slate-800 flex items-center justify-center text-sm"
                  style={{ zIndex: avatars.length - index }}
                >
                  {avatar}
                </div>
              ))}
            </div>
            <div className="ml-3 text-slate-300 text-sm font-medium">18+</div>
          </div>

          {/* Get Started button */}
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/10 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-orange-500/10 rounded-full"></div>
    </div>
  )
}

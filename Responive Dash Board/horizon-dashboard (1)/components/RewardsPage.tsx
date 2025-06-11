"use client"

import { useState } from "react"
import { Star, Gift, Coffee, Award, Clock, TrendingUp } from "lucide-react"

export default function RewardsPage() {
  const [points, setPoints] = useState(1250)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const rewards = [
    {
      id: 1,
      name: "Free Coffee",
      points: 150,
      icon: "☕",
      category: "beverages",
      available: true,
      description: "Any size coffee of your choice",
    },
    {
      id: 2,
      name: "Free Pastry",
      points: 200,
      icon: "🥐",
      category: "food",
      available: true,
      description: "Choose from our selection of fresh pastries",
    },
    {
      id: 3,
      name: "Free Lunch",
      points: 400,
      icon: "🥪",
      category: "food",
      available: true,
      description: "Any lunch item from our menu",
    },
    {
      id: 4,
      name: "Free Drink",
      points: 300,
      icon: "🧋",
      category: "beverages",
      available: true,
      description: "Any specialty drink or smoothie",
    },
    {
      id: 5,
      name: "Double Points",
      points: 500,
      icon: "⭐",
      category: "bonus",
      available: true,
      description: "Earn 2x points for 24 hours",
    },
    {
      id: 6,
      name: "Free Size Upgrade",
      points: 100,
      icon: "📏",
      category: "bonus",
      available: true,
      description: "Upgrade any drink size for free",
    },
    {
      id: 7,
      name: "Birthday Special",
      points: 0,
      icon: "🎂",
      category: "special",
      available: false,
      description: "Free birthday drink (available on your birthday)",
    },
    {
      id: 8,
      name: "Premium Membership",
      points: 1000,
      icon: "👑",
      category: "special",
      available: true,
      description: "Unlock premium rewards and benefits",
    },
  ]

  const categories = [
    { id: "all", name: "All Rewards", icon: Gift },
    { id: "beverages", name: "Beverages", icon: Coffee },
    { id: "food", name: "Food", icon: "🍽️" },
    { id: "bonus", name: "Bonus", icon: Star },
    { id: "special", name: "Special", icon: Award },
  ]

  const recentRedemptions = [
    { item: "Free Coffee", date: "2 days ago", points: 150 },
    { item: "Free Pastry", date: "1 week ago", points: 200 },
    { item: "Size Upgrade", date: "2 weeks ago", points: 100 },
  ]

  const filteredRewards =
    selectedCategory === "all" ? rewards : rewards.filter((reward) => reward.category === selectedCategory)

  const redeemReward = (reward: any) => {
    if (points >= reward.points && reward.available) {
      setPoints(points - reward.points)
      // Add success notification here
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Rewards Center</h1>
        <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-3">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="text-white text-xl font-bold">{points.toLocaleString()}</span>
          <span className="text-slate-400">points</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-white text-lg font-bold">{points.toLocaleString()}</div>
              <div className="text-slate-400 text-sm">Available Points</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-white text-lg font-bold">{recentRedemptions.length}</div>
              <div className="text-slate-400 text-sm">Rewards Redeemed</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-white text-lg font-bold">Gold</div>
              <div className="text-slate-400 text-sm">Member Status</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-white text-lg font-bold">7</div>
              <div className="text-slate-400 text-sm">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = typeof category.icon === "string" ? () => <span>{category.icon}</span> : category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-purple-500 text-white"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Recent Redemptions */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Recent Redemptions</h4>
              <div className="space-y-2">
                {recentRedemptions.map((redemption, index) => (
                  <div key={index} className="p-2 bg-slate-700/30 rounded-lg">
                    <div className="text-white text-sm font-medium">{redemption.item}</div>
                    <div className="text-slate-400 text-xs">
                      {redemption.date} • {redemption.points} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all transform hover:scale-105"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{reward.icon}</div>
                  <h3 className="text-white font-semibold text-lg">{reward.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{reward.description}</p>
                </div>

                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-bold">{reward.points}</span>
                  <span className="text-slate-400 text-sm">points</span>
                </div>

                <button
                  onClick={() => redeemReward(reward)}
                  disabled={!reward.available || points < reward.points}
                  className={`w-full py-2 rounded-lg font-medium transition-all ${
                    reward.available && points >= reward.points
                      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      : "bg-slate-600 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {!reward.available
                    ? "Not Available"
                    : points >= reward.points
                      ? "Redeem Now"
                      : `Need ${reward.points - points} more points`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

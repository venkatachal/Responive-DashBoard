"use client"

import { useState, useEffect } from "react"
import { Star, Gift, CreditCard, ArrowRight, TrendingUp, Clock } from "lucide-react"

interface StarbucksCardProps {
  onNavigate?: (section: string) => void
}

export default function StarbucksCard({ onNavigate }: StarbucksCardProps) {
  const [points, setPoints] = useState(1250)
  const [showRewards, setShowRewards] = useState(false)
  const [dailyBonus, setDailyBonus] = useState(false)
  const [lastPurchase, setLastPurchase] = useState<Date>(new Date())
  const [streakDays, setStreakDays] = useState(7)
  const [todayVisits, setTodayVisits] = useState(2)

  const rewards = [
    { name: "Free Coffee", points: 150, icon: "☕", available: true, category: "Beverages" },
    { name: "Free Pastry", points: 200, icon: "🥐", available: true, category: "Food" },
    { name: "Free Lunch", points: 400, icon: "🥪", available: true, category: "Food" },
    { name: "Free Drink", points: 300, icon: "🧋", available: true, category: "Beverages" },
    { name: "Double Points", points: 500, icon: "⭐", available: true, category: "Bonus" },
    { name: "Free Size Upgrade", points: 100, icon: "📏", available: true, category: "Bonus" },
  ]

  const [recentPurchases, setRecentPurchases] = useState([
    { item: "Caramel Macchiato", date: "Today", points: 25, time: "2:30 PM", price: "$5.45" },
    { item: "Blueberry Muffin", date: "Today", points: 15, time: "8:15 AM", price: "$3.25" },
    { item: "Iced Americano", date: "Yesterday", points: 20, time: "1:45 PM", price: "$4.15" },
    { item: "Vanilla Latte", date: "Yesterday", points: 30, time: "9:20 AM", price: "$5.95" },
  ])

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add points (simulating purchases)
      if (Math.random() > 0.95) {
        const newPoints = Math.floor(Math.random() * 30) + 10
        setPoints((prev) => prev + newPoints)

        const drinks = ["Espresso", "Cappuccino", "Frappuccino", "Green Tea", "Hot Chocolate"]
        const randomDrink = drinks[Math.floor(Math.random() * drinks.length)]
        const newPurchase = {
          item: randomDrink,
          date: "Just now",
          points: newPoints,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          price: `$${(Math.random() * 3 + 3).toFixed(2)}`,
        }

        setRecentPurchases((prev) => [newPurchase, ...prev.slice(0, 3)])
        setTodayVisits((prev) => prev + 1)
      }

      // Update streak and daily bonus
      if (Math.random() > 0.98) {
        setStreakDays((prev) => prev + 1)
      }
    }, 5000)

    // Daily bonus check
    const dailyBonusInterval = setInterval(() => {
      const now = new Date()
      const lastBonusDate = localStorage.getItem("lastStarbucksBonus")
      const today = now.toDateString()

      if (lastBonusDate !== today) {
        setDailyBonus(true)
        localStorage.setItem("lastStarbucksBonus", today)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      clearInterval(dailyBonusInterval)
    }
  }, [])

  const redeemReward = (reward: any) => {
    if (points >= reward.points) {
      setPoints(points - reward.points)
      // Add to recent activity
      const newActivity = {
        item: `Redeemed: ${reward.name}`,
        date: "Just now",
        points: -reward.points,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        price: "FREE",
      }
      setRecentPurchases((prev) => [newActivity, ...prev.slice(0, 3)])
    }
  }

  const claimDailyBonus = () => {
    setPoints((prev) => prev + 50)
    setDailyBonus(false)
    const bonusActivity = {
      item: "Daily Bonus",
      date: "Just now",
      points: 50,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      price: "BONUS",
    }
    setRecentPurchases((prev) => [bonusActivity, ...prev.slice(0, 3)])
  }

  const handleRedeemClick = () => {
    if (onNavigate) {
      onNavigate("rewards")
    }
  }

  const handlePayClick = () => {
    if (onNavigate) {
      onNavigate("payment")
    }
  }

  const nextRewardLevel = Math.ceil(points / 500) * 500
  const progressToNext = ((points % 500) / 500) * 100

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 relative overflow-hidden h-fit">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-xl"
        style={{
          backgroundImage:
            'url("https://media.istockphoto.com/id/157774909/photo/frappuccino-beverage-from-starbucks-coffee.jpg?s=612x612&w=0&k=20&c=5lXK8UoUL-rQJGP-yEmS8iguA4kK0Xy_OVv1KX0xhe8=")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      ></div>

      {/* Daily Bonus Notification */}
      {dailyBonus && (
        <div className="absolute top-2 right-2 z-20">
          <button
            onClick={claimDailyBonus}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse hover:animate-none transition-all"
          >
            🎁 Daily Bonus!
          </button>
        </div>
      )}

      <div className="relative z-10">
        {!showRewards ? (
          <>
            {/* Header with Starbucks Logo */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {/* Starbucks Logo */}
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="Starbucks Logo"
                    className="w-8 h-8 object-contain"
                    style={{
                      filter: "hue-rotate(120deg) saturate(1.5) brightness(0.3)",
                      background: "radial-gradient(circle, #00704A 0%, #00704A 100%)",
                    }}
                  />
                </div>
                <div>
                  <span className="text-white font-semibold text-base">Starbucks</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 text-xs">⭐ Gold Member</span>
                    <span className="text-orange-400 text-xs">🔥 {streakDays} day streak</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowRewards(true)}
                className="text-green-400 text-sm hover:text-green-300 transition-colors flex items-center space-x-1"
              >
                <span>Rewards</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Points Display with Animation */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current animate-pulse" />
                  <span className="text-white text-2xl font-bold">{points.toLocaleString()}</span>
                  <span className="text-slate-400 text-sm">stars</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{todayVisits} today</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-green-500 via-yellow-500 to-green-600 h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${progressToNext}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{points % 500} stars</span>
                <span>{500 - (points % 500)} to next reward</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-green-600/20 rounded-lg p-2 text-center">
                <div className="text-green-400 text-lg font-bold">{todayVisits}</div>
                <div className="text-green-300 text-xs">Visits Today</div>
              </div>
              <div className="bg-yellow-600/20 rounded-lg p-2 text-center">
                <div className="text-yellow-400 text-lg font-bold">{streakDays}</div>
                <div className="text-yellow-300 text-xs">Day Streak</div>
              </div>
              <div className="bg-orange-600/20 rounded-lg p-2 text-center">
                <div className="text-orange-400 text-lg font-bold">Gold</div>
                <div className="text-orange-300 text-xs">Status</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleRedeemClick}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">Redeem</span>
              </button>
              <button
                onClick={handlePayClick}
                className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white p-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-sm font-medium">Pay</span>
              </button>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white text-sm font-medium">Recent Activity</h4>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {recentPurchases.slice(0, 3).map((purchase, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm p-2 bg-slate-700/20 rounded-lg hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">{purchase.item}</p>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span>{purchase.date}</span>
                        <span>•</span>
                        <span>{purchase.time}</span>
                        <span>•</span>
                        <span>{purchase.price}</span>
                      </div>
                    </div>
                    <span className={`font-medium text-xs ${purchase.points > 0 ? "text-green-400" : "text-red-400"}`}>
                      {purchase.points > 0 ? "+" : ""}
                      {purchase.points} ⭐
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Rewards View */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-semibold">Available Rewards</h3>
              </div>
              <button
                onClick={() => setShowRewards(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>

            {/* Points Balance */}
            <div className="bg-gradient-to-r from-green-600/20 to-yellow-600/20 rounded-lg p-3 mb-4 border border-green-500/30">
              <div className="flex items-center justify-between">
                <span className="text-green-400 text-sm font-medium">Your Balance</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-bold text-lg">{points.toLocaleString()}</span>
                  <span className="text-slate-300 text-sm">stars</span>
                </div>
              </div>
            </div>

            {/* Rewards Categories */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {["Beverages", "Food", "Bonus"].map((category) => (
                <div key={category}>
                  <h4 className="text-slate-300 text-xs font-medium mb-2 uppercase tracking-wide">{category}</h4>
                  <div className="space-y-2">
                    {rewards
                      .filter((reward) => reward.category === category)
                      .map((reward, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all transform hover:scale-[1.02]"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{reward.icon}</span>
                            <div>
                              <p className="text-white text-sm font-medium">{reward.name}</p>
                              <p className="text-slate-400 text-xs">{reward.points} stars</p>
                            </div>
                          </div>
                          <button
                            onClick={() => redeemReward(reward)}
                            disabled={points < reward.points}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all transform hover:scale-105 ${
                              points >= reward.points
                                ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                                : "bg-slate-600 text-slate-400 cursor-not-allowed"
                            }`}
                          >
                            {points >= reward.points ? "Redeem" : "Need More"}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Special Offers */}
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">🎉 Weekend Special</p>
                  <p className="text-slate-400 text-xs">Double stars on all purchases</p>
                </div>
                <div className="text-right">
                  <div className="text-purple-400 text-xs">Ends in</div>
                  <div className="text-white text-sm font-bold">2 days</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

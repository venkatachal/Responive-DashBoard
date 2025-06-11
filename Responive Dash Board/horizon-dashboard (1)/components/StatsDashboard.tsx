"use client"

import { useState, useEffect } from "react"
import { BarChart3, DollarSign, TrendingUp, CheckCircle, FolderOpen, ChevronDown } from "lucide-react"

interface StatsData {
  earnings: number
  spendThisMonth: number
  sales: {
    amount: number
    change: number
    period: string
  }
  balance: number
  currency: string
  newTasks: number
  totalProjects: number
}

interface StatsDashboardProps {
  currentDate?: Date
}

export default function StatsDashboard({ currentDate = new Date() }: StatsDashboardProps) {
  // Generate date-based data
  const getDateSeed = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return dateStr.split("-").reduce((acc, val) => acc + Number.parseInt(val), 0)
  }

  const dateSeed = getDateSeed(currentDate)

  const generateDateBasedStats = () => {
    const random = (min: number, max: number, offset = 0) => {
      const value = ((dateSeed + offset) * 9301 + 49297) % 233280
      return min + (value / 233280) * (max - min)
    }

    return {
      earnings: random(200, 500, 1),
      spendThisMonth: random(400, 900, 2),
      sales: {
        amount: random(300, 800, 3),
        change: random(-30, 40, 4),
        period: "since last month",
      },
      balance: random(500, 2000, 5),
      currency: "USD",
      newTasks: Math.floor(random(50, 300, 6)),
      totalProjects: Math.floor(random(1000, 5000, 7)),
    }
  }

  const [stats, setStats] = useState<StatsData>(generateDateBasedStats())

  // Update stats when date changes
  useEffect(() => {
    setStats(generateDateBasedStats())
  }, [currentDate])

  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)

  const currencies = [
    { code: "USD", flag: "🇺🇸", symbol: "$" },
    { code: "EUR", flag: "🇪🇺", symbol: "€" },
    { code: "GBP", flag: "🇬🇧", symbol: "£" },
    { code: "JPY", flag: "🇯🇵", symbol: "¥" },
  ]

  // Simulate real-time data updates
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStats((prev) => ({
  //       ...prev,
  //       earnings: prev.earnings + (Math.random() * 10 - 5),
  //       spendThisMonth: prev.spendThisMonth + (Math.random() * 20 - 10),
  //       sales: {
  //         ...prev.sales,
  //         amount: prev.sales.amount + (Math.random() * 15 - 7.5),
  //         change: prev.sales.change + (Math.random() * 2 - 1),
  //       },
  //       balance: Math.max(0, prev.balance + (Math.random() * 50 - 25)),
  //       newTasks: Math.max(0, prev.newTasks + Math.floor(Math.random() * 3 - 1)),
  //       totalProjects: Math.max(0, prev.totalProjects + Math.floor(Math.random() * 5 - 2)),
  //     }))
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [])

  const formatCurrency = (amount: number) => {
    const currency = currencies.find((c) => c.code === selectedCurrency)
    return `${currency?.symbol || "$"}${amount.toFixed(amount < 100 ? 1 : 0)}`
  }

  const getCurrentFlag = () => {
    return currencies.find((c) => c.code === selectedCurrency)?.flag || "🇺🇸"
  }

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode)
    setShowCurrencyDropdown(false)
  }

  return (
    <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-indigo-900 rounded-xl p-4 sm:p-6 border border-slate-700/50 shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {/* Earnings */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="text-slate-300 text-xs sm:text-sm font-medium">Earnings</div>
            <div className="text-white text-lg sm:text-xl font-bold">{formatCurrency(stats.earnings)}</div>
          </div>
        </div>

        {/* Spend this Month */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="text-slate-300 text-xs sm:text-sm font-medium">Spend this Month</div>
            <div className="text-white text-lg sm:text-xl font-bold">{formatCurrency(stats.spendThisMonth)}</div>
          </div>
        </div>

        {/* Sales */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="text-slate-300 text-xs sm:text-sm font-medium">Sales</div>
            <div className="text-white text-lg sm:text-xl font-bold">{formatCurrency(stats.sales.amount)}</div>
            <div className={`text-xs ${stats.sales.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {stats.sales.change >= 0 ? "+" : ""}
              {stats.sales.change.toFixed(0)}% {stats.sales.period}
            </div>
          </div>
        </div>

        {/* Your Balance */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center space-x-2 bg-white/10 rounded-lg px-2 py-1 hover:bg-white/20 transition-colors"
            >
              <span className="text-lg">{getCurrentFlag()}</span>
              <ChevronDown className="w-3 h-3 text-white" />
            </button>

            {/* Currency Dropdown */}
            {showCurrencyDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 min-w-[120px]">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency.code)}
                    className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span>{currency.flag}</span>
                    <span className="text-white text-sm">{currency.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="text-slate-300 text-xs sm:text-sm font-medium">Your balance</div>
            <div className="text-white text-lg sm:text-xl font-bold">{formatCurrency(stats.balance)}</div>
          </div>
        </div>

        {/* New Tasks */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-slate-300 text-xs sm:text-sm font-medium">New Tasks</div>
            <div className="text-white text-lg sm:text-xl font-bold">{stats.newTasks.toLocaleString()}</div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="text-slate-300 text-xs sm:text-sm font-medium">Total Projects</div>
            <div className="text-white text-lg sm:text-xl font-bold">{stats.totalProjects.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-2 text-slate-400 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data updates every 5 seconds</span>
        </div>
      </div>
    </div>
  )
}

"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { RevenueData } from "@/hooks/useRealTimeData"

interface RevenueChartProps {
  data: RevenueData[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const totalRevenue = data.reduce((sum, item) => sum + item.value, 0)
  const avgChange = data.reduce((sum, item) => sum + item.change, 0) / data.length

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-slate-400 text-sm">This month</h3>
          <p className="text-white text-2xl sm:text-3xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</p>
          <p className={`text-sm flex items-center mt-1 ${avgChange >= 0 ? "text-green-400" : "text-red-400"}`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${avgChange >= 0 ? "bg-green-400" : "bg-red-400"}`}></span>
            {avgChange >= 0 ? "+" : ""}
            {avgChange.toFixed(1)}% On track
          </p>
        </div>
      </div>

      <div className="h-32 sm:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [`$${(value / 1000).toFixed(1)}K`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#8B5CF6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

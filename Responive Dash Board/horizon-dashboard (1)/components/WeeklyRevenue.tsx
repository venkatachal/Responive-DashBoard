"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import type { WeeklyData } from "@/hooks/useRealTimeData"

interface WeeklyRevenueProps {
  data: WeeklyData[]
}

export default function WeeklyRevenue({ data }: WeeklyRevenueProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-white text-base sm:text-lg font-semibold">Weekly Revenue</h3>
      </div>

      <div className="h-32 sm:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
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
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

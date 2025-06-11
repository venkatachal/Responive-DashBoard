"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import type { TrafficData } from "@/hooks/useRealTimeData"

interface DailyTrafficProps {
  data: TrafficData[]
}

export default function DailyTraffic({ data }: DailyTrafficProps) {
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0)
  const avgGrowth = 2.45 // This could be calculated based on historical data

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-slate-400 text-sm">Daily Traffic</h3>
          <p className="text-white text-xl sm:text-2xl font-bold">{totalVisitors.toLocaleString()}</p>
          <p className="text-green-400 text-xs">+{avgGrowth}%</p>
        </div>
      </div>

      <div className="h-24 sm:h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="hour" stroke="#9CA3AF" fontSize={10} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [value.toLocaleString(), "Visitors"]}
            />
            <Bar dataKey="visitors" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

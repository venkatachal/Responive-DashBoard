"use client"

import { useState, useEffect } from "react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface ChartData {
  name: string
  value: number
  color: string
}

export default function PieChart() {
  const [data, setData] = useState<ChartData[]>([
    { name: "Desktop", value: 63, color: "#8B5CF6" },
    { name: "Tablet", value: 25, color: "#3B82F6" },
    { name: "Mobile", value: 12, color: "#06B6D4" },
  ])

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          value: Math.max(5, Math.min(80, item.value + Math.random() * 6 - 3)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-base sm:text-lg font-semibold">Your Pie Chart</h3>
      </div>

      <div className="h-24 sm:h-32">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={15} outerRadius={40} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-sm mt-4">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-white font-semibold">{item.value.toFixed(0)}%</div>
            <div className="text-slate-400 text-xs">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

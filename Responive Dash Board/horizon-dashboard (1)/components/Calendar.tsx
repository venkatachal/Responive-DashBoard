"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps {
  currentDate: Date
}

export default function Calendar({ currentDate }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [calendarDate, setCalendarDate] = useState(currentDate)

  const navigateMonth = (direction: "prev" | "next") => {
    setCalendarDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay()
  const today = new Date().getDate()
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const days = []
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-6 sm:h-8"></div>)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === today && calendarDate.getMonth() === currentMonth && calendarDate.getFullYear() === currentYear
    const isSelected = day === selectedDate

    days.push(
      <div
        key={day}
        onClick={() => setSelectedDate(day)}
        className={`h-6 sm:h-8 flex items-center justify-center text-xs sm:text-sm cursor-pointer rounded-lg transition-colors ${
          isToday
            ? "bg-purple-500 text-white"
            : isSelected
              ? "bg-purple-400 text-white"
              : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
        }`}
      >
        {day}
      </div>,
    )
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-base sm:text-lg font-semibold">Calendar</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-slate-400 text-sm min-w-[100px] text-center">
            {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth("next")}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="h-6 sm:h-8 flex items-center justify-center text-slate-400 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">{days}</div>

      {selectedDate && (
        <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
          <p className="text-white text-sm">
            Selected: {monthNames[calendarDate.getMonth()]} {selectedDate}, {calendarDate.getFullYear()}
          </p>
        </div>
      )}
    </div>
  )
}

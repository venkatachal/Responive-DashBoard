"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRealTimeData } from "@/hooks/useRealTimeData"
import RevenueChart from "./RevenueChart"
import DataTable from "./DataTable"
import TaskList from "./TaskList"
import Calendar from "./Calendar"
import TeamMembers from "./TeamMembers"
import DailyTraffic from "./DailyTraffic"
import PieChart from "./PieChart"
import ComplexTable from "./ComplexTable"
import StarbucksCard from "./StarbucksCard"
import WeeklyRevenue from "./WeeklyRevenue"
import BusinessDesignCard from "./BusinessDesignCard"
import CardSecurityControl from "./CardSecurityControl"
import StatsDashboard from "./StatsDashboard"

interface MainDashboardProps {
  currentDate: Date
  updateDate: (direction: "prev" | "next") => void
}

export default function MainDashboard({ currentDate, updateDate }: MainDashboardProps) {
  const {
    revenueData,
    weeklyData,
    trafficData,
    teamMembers,
    tasks,
    checkTableData,
    complexTableData,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTask,
    updateTask,
    deleteTask,
    addCheckTableRow,
    updateCheckTableRow,
    deleteCheckTableRow,
    addComplexTableRow,
    updateComplexTableRow,
    deleteComplexTableRow,
  } = useRealTimeData(currentDate) // Pass currentDate here

  const handleStarbucksNavigation = (section: string) => {
    window.dispatchEvent(new CustomEvent("navigate", { detail: section }))
  }

  const handleBusinessDesignNavigation = (section: string) => {
    window.dispatchEvent(new CustomEvent("navigate", { detail: section }))
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Date Navigation */}
      <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700/50">
        <h2 className="text-white text-base sm:text-lg font-semibold">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateDate("prev")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => updateDate("next")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <StatsDashboard currentDate={currentDate} />

      {/* Top Row - Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RevenueChart data={revenueData} />
        <WeeklyRevenue data={weeklyData} />
      </div>

      {/* Middle Row - Tables and Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2 lg:col-span-1">
          <DataTable
            data={checkTableData}
            onAdd={addCheckTableRow}
            onUpdate={updateCheckTableRow}
            onDelete={deleteCheckTableRow}
          />
        </div>
        <DailyTraffic data={trafficData} />
        <PieChart />
      </div>

      {/* Bottom Row - Complex Table, Tasks, Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <ComplexTable
          data={complexTableData}
          onAdd={addComplexTableRow}
          onUpdate={updateComplexTableRow}
          onDelete={deleteComplexTableRow}
        />
        <TaskList tasks={tasks} onAdd={addTask} onUpdate={updateTask} onDelete={deleteTask} />
        <Calendar currentDate={currentDate} />
      </div>

      {/* Bottom Section - Team, Security, Starbucks, Business Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TeamMembers
          members={teamMembers}
          onAdd={addTeamMember}
          onUpdate={updateTeamMember}
          onDelete={deleteTeamMember}
        />
        <CardSecurityControl />
        <StarbucksCard onNavigate={handleStarbucksNavigation} />
        <BusinessDesignCard onNavigate={handleBusinessDesignNavigation} />
      </div>
    </div>
  )
}

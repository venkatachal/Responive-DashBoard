"use client"

import { useState, useEffect, useCallback } from "react"

// Types for all data structures
export interface RevenueData {
  month: string
  value: number
  change: number
}

export interface WeeklyData {
  day: string
  value: number
}

export interface TrafficData {
  hour: string
  visitors: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "offline" | "away"
  joinDate: string
}

export interface Task {
  id: string
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
  assignee: string
  dueDate: string
}

export interface TableRow {
  id: string
  name: string
  progress: number
  quantity: number
  date: string
  status: "Approved" | "Disable" | "Error"
}

export interface ComplexTableRow {
  id: string
  name: string
  status: "Approved" | "Disable" | "Error"
  progress: number
  date: string
  category: string
}

// Custom hook for real-time data management
// Add date parameter to the hook
export function useRealTimeData(currentDate: Date = new Date()) {
  // Generate date-based seed for consistent daily data
  const getDateSeed = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return dateStr.split("-").reduce((acc, val) => acc + Number.parseInt(val), 0)
  }

  const dateSeed = getDateSeed(currentDate)

  // Generate date-specific data
  const generateDateBasedData = () => {
    const seed = dateSeed
    const random = (min: number, max: number, offset = 0) => {
      const value = ((seed + offset) * 9301 + 49297) % 233280
      return min + (value / 233280) * (max - min)
    }

    return {
      revenueData: [
        { month: "Sep", value: Math.floor(random(15000, 25000, 1)), change: random(-10, 15, 1) },
        { month: "Oct", value: Math.floor(random(35000, 55000, 2)), change: random(5, 20, 2) },
        { month: "Nov", value: Math.floor(random(25000, 40000, 3)), change: random(-5, 10, 3) },
        { month: "Dec", value: Math.floor(random(60000, 80000, 4)), change: random(10, 25, 4) },
        { month: "Jan", value: Math.floor(random(20000, 35000, 5)), change: random(-15, 5, 5) },
        { month: "Feb", value: Math.floor(random(45000, 65000, 6)), change: random(8, 22, 6) },
      ],
      weeklyData: Array.from({ length: 9 }, (_, i) => ({
        day: (17 + i).toString(),
        value: Math.floor(random(2000, 10000, i + 10)),
      })),
      trafficData: Array.from({ length: 7 }, (_, i) => ({
        hour: (i * 4).toString().padStart(2, "0"),
        visitors: Math.floor(random(800, 4000, i + 20)),
      })),
      teamMembers: [
        {
          id: "1",
          name: "Adela Parkson",
          role: "Creative Director",
          avatar: "👩‍💼",
          status: random(0, 3, 30) > 1 ? "online" : random(0, 2, 31) > 1 ? "away" : "offline",
          joinDate: "2023-01-15",
        },
        {
          id: "2",
          name: "Christian Mad",
          role: "Product Designer",
          avatar: "👨‍💻",
          status: random(0, 3, 32) > 1 ? "online" : random(0, 2, 33) > 1 ? "away" : "offline",
          joinDate: "2023-02-20",
        },
        {
          id: "3",
          name: "Jason Statham",
          role: "Junior Graphic Designer",
          avatar: "👨‍🎨",
          status: random(0, 3, 34) > 1 ? "online" : random(0, 2, 35) > 1 ? "away" : "offline",
          joinDate: "2023-03-10",
        },
      ],
      tasks: [
        {
          id: "1",
          title: "Landing Page Design",
          completed: random(0, 1, 40) > 0.5,
          priority: random(0, 3, 41) > 2 ? "high" : random(0, 2, 42) > 1 ? "medium" : "low",
          assignee: "Adela Parkson",
          dueDate: "2024-01-15",
        },
        {
          id: "2",
          title: "Dashboard Builder",
          completed: random(0, 1, 43) > 0.5,
          priority: random(0, 3, 44) > 2 ? "high" : random(0, 2, 45) > 1 ? "medium" : "low",
          assignee: "Christian Mad",
          dueDate: "2024-01-20",
        },
        {
          id: "3",
          title: "Mobile App Design",
          completed: random(0, 1, 46) > 0.5,
          priority: random(0, 3, 47) > 2 ? "high" : random(0, 2, 48) > 1 ? "medium" : "low",
          assignee: "Jason Statham",
          dueDate: "2024-01-18",
        },
        {
          id: "4",
          title: "Illustrations",
          completed: random(0, 1, 49) > 0.5,
          priority: random(0, 3, 50) > 2 ? "high" : random(0, 2, 51) > 1 ? "medium" : "low",
          assignee: "Adela Parkson",
          dueDate: "2024-01-25",
        },
        {
          id: "5",
          title: "Promotional LP",
          completed: random(0, 1, 52) > 0.5,
          priority: random(0, 3, 53) > 2 ? "high" : random(0, 2, 54) > 1 ? "medium" : "low",
          assignee: "Christian Mad",
          dueDate: "2024-01-22",
        },
      ],
      checkTableData: Array.from({ length: 4 }, (_, i) => ({
        id: (i + 1).toString(),
        name: ["Horizon UI PRO", "Horizon UI Free", "Weekly Update", "Venus 3D Asset"][i],
        progress: random(10, 90, i + 60),
        quantity: Math.floor(random(500, 3000, i + 65)),
        date: `${Math.floor(random(1, 28, i + 70))} Jan 2021`,
        status: random(0, 3, i + 75) > 2 ? "Approved" : random(0, 2, i + 76) > 1 ? "Disable" : "Error",
      })),
      complexTableData: Array.from({ length: 4 }, (_, i) => ({
        id: (i + 1).toString(),
        name: ["Horizon UI PRO", "Horizon UI Free", "Marketplace", "Weekly Update"][i],
        status: random(0, 3, i + 80) > 2 ? "Approved" : random(0, 2, i + 81) > 1 ? "Disable" : "Error",
        progress: random(20, 95, i + 85),
        date: `${Math.floor(random(1, 28, i + 90))} Apr 2022`,
        category: ["Development", "Design", "Marketing", "Content"][i],
      })),
    }
  }

  // Initialize with date-based data
  const dateBasedData = generateDateBasedData()

  const [revenueData, setRevenueData] = useState<RevenueData[]>(dateBasedData.revenueData)
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>(dateBasedData.weeklyData)
  const [trafficData, setTrafficData] = useState<TrafficData[]>(dateBasedData.trafficData)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(dateBasedData.teamMembers)
  const [tasks, setTasks] = useState<Task[]>(dateBasedData.tasks)
  const [checkTableData, setCheckTableData] = useState<TableRow[]>(dateBasedData.checkTableData)
  const [complexTableData, setComplexTableData] = useState<ComplexTableRow[]>(dateBasedData.complexTableData)

  // Update data when date changes
  useEffect(() => {
    const newData = generateDateBasedData()
    setRevenueData(newData.revenueData)
    setWeeklyData(newData.weeklyData)
    setTrafficData(newData.trafficData)
    setTeamMembers(newData.teamMembers)
    setTasks(newData.tasks)
    setCheckTableData(newData.checkTableData)
    setComplexTableData(newData.complexTableData)
  }, [currentDate])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update traffic data every 30 seconds
      setTrafficData((prev) =>
        prev.map((item) => ({
          ...item,
          visitors: Math.max(500, item.visitors + Math.floor(Math.random() * 200 - 100)),
        })),
      )

      // Update progress in tables randomly
      setCheckTableData((prev) =>
        prev.map((item) => ({
          ...item,
          progress: Math.min(100, Math.max(0, item.progress + Math.random() * 2 - 1)),
        })),
      )

      setComplexTableData((prev) =>
        prev.map((item) => ({
          ...item,
          progress: Math.min(100, Math.max(0, item.progress + Math.random() * 2 - 1)),
        })),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // CRUD operations
  const addTeamMember = useCallback((member: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
    }
    setTeamMembers((prev) => [...prev, newMember])
  }, [])

  const updateTeamMember = useCallback((id: string, updates: Partial<TeamMember>) => {
    setTeamMembers((prev) => prev.map((member) => (member.id === id ? { ...member, ...updates } : member)))
  }, [])

  const deleteTeamMember = useCallback((id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id))
  }, [])

  const addTask = useCallback((task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    }
    setTasks((prev) => [...prev, newTask])
  }, [])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const addCheckTableRow = useCallback((row: Omit<TableRow, "id">) => {
    const newRow: TableRow = {
      ...row,
      id: Date.now().toString(),
    }
    setCheckTableData((prev) => [...prev, newRow])
  }, [])

  const updateCheckTableRow = useCallback((id: string, updates: Partial<TableRow>) => {
    setCheckTableData((prev) => prev.map((row) => (row.id === id ? { ...row, ...updates } : row)))
  }, [])

  const deleteCheckTableRow = useCallback((id: string) => {
    setCheckTableData((prev) => prev.filter((row) => row.id !== id))
  }, [])

  const addComplexTableRow = useCallback((row: Omit<ComplexTableRow, "id">) => {
    const newRow: ComplexTableRow = {
      ...row,
      id: Date.now().toString(),
    }
    setComplexTableData((prev) => [...prev, newRow])
  }, [])

  const updateComplexTableRow = useCallback((id: string, updates: Partial<ComplexTableRow>) => {
    setComplexTableData((prev) => prev.map((row) => (row.id === id ? { ...row, ...updates } : row)))
  }, [])

  const deleteComplexTableRow = useCallback((id: string) => {
    setComplexTableData((prev) => prev.filter((row) => row.id !== id))
  }, [])

  return {
    // Data
    revenueData,
    weeklyData,
    trafficData,
    teamMembers,
    tasks,
    checkTableData,
    complexTableData,
    // Team CRUD
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    // Task CRUD
    addTask,
    updateTask,
    deleteTask,
    // Check Table CRUD
    addCheckTableRow,
    updateCheckTableRow,
    deleteCheckTableRow,
    // Complex Table CRUD
    addComplexTableRow,
    updateComplexTableRow,
    deleteComplexTableRow,
  }
}

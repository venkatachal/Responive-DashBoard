"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import MainDashboard from "@/components/MainDashboard"
import ProfilePage from "@/components/ProfilePage"
import TablesPage from "@/components/TablesPage"
import SignInPage from "@/components/SignInPage"
import SettingsPage from "@/components/SettingsPage"
import RewardsPage from "@/components/RewardsPage"
import PaymentPage from "@/components/PaymentPage"
import BusinessDesignPage from "@/components/BusinessDesignPage"

interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  avatar: string
  joinDate: string
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("signin")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const navigateToSection = (section: string) => {
    setActiveSection(section)
  }

  const updateDate = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleSignIn = (user: User) => {
    setCurrentUser(user)
    setActiveSection("dashboard")
  }

  const handleSignOut = () => {
    setCurrentUser(null)
    setActiveSection("signin")
  }

  const handleUpdateUser = (updates: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates })
    }
  }

  const handleSearch = (query: string) => {
    // Search functionality can be enhanced here
    console.log("Searching for:", query)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "signin":
        return <SignInPage onSignIn={handleSignIn} onNavigate={navigateToSection} />
      case "profile":
        return <ProfilePage />
      case "tables":
        return <TablesPage />
      case "settings":
        return <SettingsPage currentUser={currentUser} onUpdateUser={handleUpdateUser} />
      case "rewards":
        return <RewardsPage />
      case "payment":
        return <PaymentPage />
      case "business-design":
        return <BusinessDesignPage />
      default:
        return <MainDashboard currentDate={currentDate} updateDate={updateDate} />
    }
  }

  useEffect(() => {
    const handleNavigation = (event: any) => {
      setActiveSection(event.detail)
    }

    window.addEventListener("navigate", handleNavigation)
    return () => window.removeEventListener("navigate", handleNavigation)
  }, [])

  // Show sign-in page without sidebar/header if not authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">{renderContent()}</div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar activeSection={activeSection} onNavigate={navigateToSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onNavigate={navigateToSection}
          onSearch={handleSearch}
        />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

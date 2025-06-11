"use client"

import { useState } from "react"
import { User, Bell, Shield, Palette, Monitor, Moon, Sun, Save, RefreshCw } from "lucide-react"

interface SettingsPageProps {
  currentUser?: {
    id: string
    name: string
    email: string
    role: string
    avatar: string
  }
  onUpdateUser?: (updates: any) => void
}

export default function SettingsPage({ currentUser, onUpdateUser }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [settings, setSettings] = useState({
    // Profile Settings
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    avatar: currentUser?.avatar || "👤",
    role: currentUser?.role || "User",
    bio: "Passionate about creating amazing user experiences",

    // Appearance Settings
    theme: "dark",
    accentColor: "purple",
    fontSize: "medium",
    sidebarCollapsed: false,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    taskReminders: true,
    teamUpdates: true,

    // Privacy Settings
    profileVisibility: "team",
    activityStatus: true,
    dataSharing: false,
    analyticsTracking: true,

    // System Settings
    language: "en",
    timezone: "UTC-8",
    dateFormat: "MM/DD/YYYY",
    autoSave: true,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "system", label: "System", icon: Monitor },
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (onUpdateUser) {
      onUpdateUser({
        name: settings.name,
        email: settings.email,
        avatar: settings.avatar,
        role: settings.role,
      })
    }

    setIsSaving(false)
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => handleSettingChange("name", e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleSettingChange("email", e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Avatar</label>
            <input
              type="text"
              value={settings.avatar}
              onChange={(e) => handleSettingChange("avatar", e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
              placeholder="Enter emoji or character"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Role</label>
            <select
              value={settings.role}
              onChange={(e) => handleSettingChange("role", e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-slate-300 text-sm font-medium mb-2">Bio</label>
          <textarea
            value={settings.bio}
            onChange={(e) => handleSettingChange("bio", e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            rows={3}
          />
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Theme & Display</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-3">Theme</label>
            <div className="space-y-2">
              {[
                { value: "dark", label: "Dark", icon: Moon },
                { value: "light", label: "Light", icon: Sun },
                { value: "auto", label: "Auto", icon: Monitor },
              ].map((theme) => {
                const Icon = theme.icon
                return (
                  <label key={theme.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={theme.value}
                      checked={settings.theme === theme.value}
                      onChange={(e) => handleSettingChange("theme", e.target.value)}
                      className="text-purple-500"
                    />
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{theme.label}</span>
                  </label>
                )
              })}
            </div>
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-3">Accent Color</label>
            <div className="grid grid-cols-4 gap-2">
              {["purple", "blue", "green", "red", "orange", "pink", "indigo", "teal"].map((color) => (
                <button
                  key={color}
                  onClick={() => handleSettingChange("accentColor", color)}
                  className={`w-8 h-8 rounded-lg border-2 ${
                    settings.accentColor === color ? "border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: `var(--${color}-500, #8B5CF6)` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
            { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications" },
            { key: "soundEnabled", label: "Sound Effects", desc: "Play sounds for notifications" },
            { key: "taskReminders", label: "Task Reminders", desc: "Reminders for upcoming tasks" },
            { key: "teamUpdates", label: "Team Updates", desc: "Updates from team members" },
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div>
                <div className="text-white font-medium">{setting.label}</div>
                <div className="text-slate-400 text-sm">{setting.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[setting.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Privacy & Security</h3>
        <div className="space-y-4">
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <label className="block text-slate-300 text-sm font-medium mb-2">Profile Visibility</label>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange("profileVisibility", e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="public">Public</option>
              <option value="team">Team Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          {[
            { key: "activityStatus", label: "Show Activity Status", desc: "Let others see when you're online" },
            { key: "dataSharing", label: "Data Sharing", desc: "Share usage data for improvements" },
            { key: "analyticsTracking", label: "Analytics Tracking", desc: "Track usage for analytics" },
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div>
                <div className="text-white font-medium">{setting.label}</div>
                <div className="text-slate-400 text-sm">{setting.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[setting.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">System Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange("timezone", e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">GMT (UTC+0)</option>
              <option value="UTC+1">Central European Time (UTC+1)</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange("dateFormat", e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <div>
              <div className="text-white font-medium">Auto Save</div>
              <div className="text-slate-400 text-sm">Automatically save changes</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange("autoSave", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileSettings()
      case "appearance":
        return renderAppearanceSettings()
      case "notifications":
        return renderNotificationSettings()
      case "privacy":
        return renderPrivacySettings()
      case "system":
        return renderSystemSettings()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-purple-500 text-white"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

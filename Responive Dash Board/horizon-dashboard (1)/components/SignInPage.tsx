"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, UserIcon, Mail, Lock, ArrowRight } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  avatar: string
  joinDate: string
}

interface SignInPageProps {
  onSignIn: (user: User) => void
  onNavigate: (section: string) => void
}

export default function SignInPage({ onSignIn, onNavigate }: SignInPageProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Mock user database (in real app, this would be in a database)
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Adela Parkson",
      email: "adela@horizon.com",
      password: "password123",
      role: "Creative Director",
      avatar: "👩‍💼",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@horizon.com",
      password: "password123",
      role: "Developer",
      avatar: "👨‍💻",
      joinDate: "2023-02-20",
    },
  ])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = "Name is required"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (isSignUp) {
      // Check if user already exists
      const existingUser = users.find((user) => user.email === formData.email)
      if (existingUser) {
        setErrors({ email: "User already exists with this email" })
        setIsLoading(false)
        return
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "User",
        avatar: "👤",
        joinDate: new Date().toISOString().split("T")[0],
      }

      setUsers([...users, newUser])
      onSignIn(newUser)
      onNavigate("dashboard")
    } else {
      // Sign in existing user
      const user = users.find((u) => u.email === formData.email && u.password === formData.password)
      if (user) {
        onSignIn(user)
        onNavigate("dashboard")
      } else {
        setErrors({ email: "Invalid email or password" })
      }
    }

    setIsLoading(false)
  }

  const handleDemoLogin = () => {
    const demoUser = users[0] // Use Adela as demo user
    onSignIn(demoUser)
    onNavigate("dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div>
              <span className="text-white font-semibold text-xl">HORIZON</span>
              <span className="text-purple-400 text-sm ml-1">FREE</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-slate-400">
            {isSignUp ? "Sign up to get started with Horizon" : "Sign in to your account"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-slate-700/50 border rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.name ? "border-red-500" : "border-slate-600"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-slate-700/50 border rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? "border-red-500" : "border-slate-600"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full bg-slate-700/50 border rounded-lg pl-10 pr-12 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.password ? "border-red-500" : "border-slate-600"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {isSignUp && (
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full bg-slate-700/50 border rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.confirmPassword ? "border-red-500" : "border-slate-600"
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Login */}
          {!isSignUp && (
            <div className="mt-4">
              <button
                onClick={handleDemoLogin}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Demo Login (Adela Parkson)
              </button>
            </div>
          )}

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setFormData({ name: "", email: "", password: "", confirmPassword: "" })
                  setErrors({})
                }}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="text-slate-400">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-400">📊</span>
            </div>
            <p className="text-sm">Analytics</p>
          </div>
          <div className="text-slate-400">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-400">👥</span>
            </div>
            <p className="text-sm">Team Management</p>
          </div>
          <div className="text-slate-400">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-green-400">🔒</span>
            </div>
            <p className="text-sm">Secure</p>
          </div>
        </div>
      </div>
    </div>
  )
}

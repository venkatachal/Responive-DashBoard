"use client"

import { useState, useEffect } from "react"
import { Play, Clock, Users, BookOpen, Award, ChevronRight, Star } from "lucide-react"

export default function BusinessDesignPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const courses = [
    {
      id: "fundamentals",
      title: "Business Design Fundamentals",
      description: "Learn the core principles of business design and strategy",
      duration: "85 mins",
      format: "Video",
      level: "Beginner",
      students: 1247,
      rating: 4.8,
      lessons: 12,
      completed: false,
    },
    {
      id: "advanced",
      title: "Advanced Product Strategy",
      description: "Deep dive into product development and market analysis",
      duration: "120 mins",
      format: "Interactive",
      level: "Advanced",
      students: 892,
      rating: 4.9,
      lessons: 18,
      completed: false,
    },
    {
      id: "case-studies",
      title: "Real-World Case Studies",
      description: "Analyze successful business design implementations",
      duration: "95 mins",
      format: "Case Study",
      level: "Intermediate",
      students: 634,
      rating: 4.7,
      lessons: 8,
      completed: true,
    },
  ]

  const recentStudents = [
    { name: "Alex Chen", avatar: "👨‍💼", progress: 85, course: "Fundamentals" },
    { name: "Sarah Kim", avatar: "👩‍💻", progress: 92, course: "Advanced" },
    { name: "Mike Johnson", avatar: "👨‍🎨", progress: 67, course: "Case Studies" },
    { name: "Emma Davis", avatar: "👩‍🔬", progress: 78, course: "Fundamentals" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Business Design Learning</h1>
        <div className="flex items-center space-x-2 text-slate-400">
          <Users className="w-5 h-5" />
          <span>{recentStudents.length} active learners</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl p-8 border border-purple-500/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What do you need to know to create better products?</h2>
            <p className="text-slate-300 mb-6">
              Master the art of business design with our comprehensive courses. Learn from industry experts and apply
              your knowledge to real-world scenarios.
            </p>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-white">300+ mins of content</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-orange-400" />
                <span className="text-white">Interactive format</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
              Start Learning Now
            </button>
          </div>
          <div className="relative">
            <div className="w-full h-64 bg-slate-800/50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-purple-400" />
                </div>
                <p className="text-slate-400">Course Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all transform hover:scale-105 cursor-pointer"
            onClick={() => setSelectedCourse(course.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-slate-400 text-sm">{course.level}</span>
              </div>
              {course.completed && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <h3 className="text-white text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{course.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-orange-400" />
                <span className="text-white text-sm">{course.format}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">{course.students}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">{course.lessons} lessons</span>
              <ChevronRight className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-white text-lg font-semibold mb-4">Recent Students</h3>
          <div className="space-y-4">
            {recentStudents.map((student, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-lg">{student.avatar}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{student.name}</div>
                    <div className="text-slate-400 text-sm">{student.course}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{student.progress}%</div>
                  <div className="w-16 bg-slate-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-white text-lg font-semibold mb-4">Learning Progress</h3>
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeDasharray={`${progress}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold">{progress}%</span>
              </div>
            </div>
            <p className="text-slate-400">Overall completion rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

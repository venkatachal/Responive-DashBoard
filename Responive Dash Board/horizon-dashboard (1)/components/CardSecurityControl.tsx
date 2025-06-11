"use client"

import type React from "react"

import { useState } from "react"
import { Fingerprint, Shield, CreditCard, Lock, CheckCircle, X } from "lucide-react"

interface SecurityFeature {
  id: string
  name: string
  enabled: boolean
  icon: React.ElementType
  description: string
}

export default function CardSecurityControl() {
  // Card security features state
  const [securityFeatures, setSecurityFeatures] = useState<SecurityFeature[]>([
    {
      id: "contactless",
      name: "Contactless Payments",
      enabled: true,
      icon: CreditCard,
      description: "Enable or disable contactless payments on your card",
    },
    {
      id: "international",
      name: "International Transactions",
      enabled: false,
      icon: Shield,
      description: "Allow transactions from international merchants",
    },
    {
      id: "online",
      name: "Online Purchases",
      enabled: true,
      icon: Lock,
      description: "Enable or disable online and in-app purchases",
    },
  ])

  // Modal state
  const [showModal, setShowModal] = useState(false)

  // Card status
  const [cardStatus, setCardStatus] = useState<"active" | "locked" | "inactive">("active")

  // Success message state
  const [showSuccess, setShowSuccess] = useState(false)

  // Toggle security feature
  const toggleFeature = (id: string) => {
    setSecurityFeatures((features) =>
      features.map((feature) => (feature.id === id ? { ...feature, enabled: !feature.enabled } : feature)),
    )

    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Toggle card lock status
  const toggleCardLock = () => {
    setCardStatus((status) => (status === "locked" ? "active" : "locked"))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Get active features count
  const activeFeatures = securityFeatures.filter((f) => f.enabled).length

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 max-w-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-indigo-900/80 rounded-xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Fingerprint Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <Fingerprint
              className={`w-16 h-16 ${cardStatus === "locked" ? "text-red-400" : "text-white"}`}
              strokeWidth={1.5}
            />
            {/* Additional fingerprint rings for more detail */}
            <div className="absolute inset-0 w-16 h-16">
              <svg
                viewBox="0 0 64 64"
                className={`w-full h-full ${cardStatus === "locked" ? "text-red-400/80" : "text-white/80"}`}
              >
                <path
                  d="M32 8c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <path
                  d="M32 12c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20S43.046 12 32 12z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <path
                  d="M32 16c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16S40.837 16 32 16z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center mb-4">
          <div
            className={`w-2 h-2 rounded-full ${
              cardStatus === "active" ? "bg-green-500" : cardStatus === "locked" ? "bg-red-500" : "bg-yellow-500"
            }`}
          ></div>
          <span
            className={`ml-2 text-sm ${
              cardStatus === "active" ? "text-green-400" : cardStatus === "locked" ? "text-red-400" : "text-yellow-400"
            }`}
          >
            {cardStatus === "active" ? "Card Active" : cardStatus === "locked" ? "Card Locked" : "Card Inactive"}
          </span>
        </div>

        {/* Main heading */}
        <h3 className="text-white text-xl font-bold leading-tight mb-3">
          Control card security
          <br />
          in-app with a tap
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {cardStatus === "locked"
            ? "Your card is currently locked for security."
            : `Discover our cards benefits, with one tap. ${activeFeatures}/3 features enabled.`}
        </p>

        {/* Cards button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
        >
          {cardStatus === "locked" ? "Unlock Card" : "Cards"}
        </button>

        {/* Quick action - Lock/Unlock */}
        <button
          onClick={toggleCardLock}
          className={`mt-3 text-sm ${cardStatus === "locked" ? "text-green-400" : "text-red-400"} hover:underline`}
        >
          {cardStatus === "locked" ? "Unlock card" : "Lock card temporarily"}
        </button>
      </div>

      {/* Success message */}
      {showSuccess && (
        <div className="absolute top-4 right-4 left-4 bg-green-500/20 border border-green-500/30 text-green-400 text-sm py-2 px-3 rounded-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Settings updated successfully</span>
          </div>
          <button onClick={() => setShowSuccess(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal for security controls */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold">Card Security Controls</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Card status toggle */}
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Card Status</div>
                      <div className="text-slate-400 text-sm">Lock or unlock your card</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cardStatus !== "locked"}
                        onChange={toggleCardLock}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                </div>

                {/* Security features */}
                {securityFeatures.map((feature) => (
                  <div key={feature.id} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-600/50 rounded-full flex items-center justify-center">
                          <feature.icon className="w-4 h-4 text-slate-300" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{feature.name}</div>
                          <div className="text-slate-400 text-sm">{feature.description}</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={feature.enabled}
                          onChange={() => toggleFeature(feature.id)}
                          disabled={cardStatus === "locked"}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                      </label>
                    </div>
                  </div>
                ))}

                {/* Card information */}
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-white font-medium mb-2">Card Information</div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                    <div className="text-slate-300 text-sm">•••• •••• •••• 4242</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-slate-400">Expiry</div>
                      <div className="text-white">05/25</div>
                    </div>
                    <div>
                      <div className="text-slate-400">CVV</div>
                      <div className="text-white">•••</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500/10 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-indigo-500/10 rounded-full"></div>
      <div className="absolute top-1/2 right-2 w-4 h-4 bg-white/5 rounded-full"></div>
    </div>
  )
}

import { Shield } from "lucide-react"

export default function SecurityCard() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50">
      <div className="text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-white text-base sm:text-lg font-semibold mb-2">Control card security</h3>
        <h4 className="text-white text-sm sm:text-base font-medium mb-2">in-app with a tap</h4>
        <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">Discover our cards benefits, with one tap.</p>
        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm">
          Cards
        </button>
      </div>
    </div>
  )
}

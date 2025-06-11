export default function PromoCard() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span className="text-white font-semibold text-sm sm:text-base">Starbucks</span>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">10% cashback & off</p>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-orange-500 rounded-full"></div>
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full"></div>
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-20 transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8"></div>
    </div>
  )
}

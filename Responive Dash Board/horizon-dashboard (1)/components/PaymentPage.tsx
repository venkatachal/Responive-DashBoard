"use client"

import { useState } from "react"
import { CreditCard, Smartphone, QrCode, Wallet, Plus, Check } from "lucide-react"

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [amount, setAmount] = useState("5.45")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: CreditCard, description: "Pay with your saved card" },
    { id: "mobile", name: "Mobile Pay", icon: Smartphone, description: "Apple Pay, Google Pay" },
    { id: "qr", name: "QR Code", icon: QrCode, description: "Scan to pay" },
    { id: "wallet", name: "Digital Wallet", icon: Wallet, description: "PayPal, Venmo" },
  ]

  const savedCards = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: 2, type: "Mastercard", last4: "8888", expiry: "09/26", isDefault: false },
  ]

  const recentOrders = [
    { item: "Caramel Macchiato", price: "$5.45", date: "Today", status: "Completed" },
    { item: "Blueberry Muffin", price: "$3.25", date: "Today", status: "Completed" },
    { item: "Iced Americano", price: "$4.15", date: "Yesterday", status: "Completed" },
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setPaymentComplete(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setPaymentComplete(false)
      setAmount("5.45")
    }, 3000)
  }

  if (paymentComplete) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-slate-400">Your order has been processed</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl mb-2">☕</div>
            <h3 className="text-white font-semibold">Caramel Macchiato</h3>
            <p className="text-slate-400 text-sm">Large • Extra Shot</p>
            <div className="text-2xl font-bold text-green-400 mt-2">${amount}</div>
            <p className="text-slate-400 text-sm mt-2">+25 Starbucks points earned</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Payment</h1>
        <div className="text-right">
          <div className="text-slate-400 text-sm">Total Amount</div>
          <div className="text-white text-2xl font-bold">${amount}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-white font-semibold mb-4">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMethod === method.id
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-purple-400" />
                      <div className="text-left">
                        <div className="text-white font-medium">{method.name}</div>
                        <div className="text-slate-400 text-sm">{method.description}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Card Details */}
          {selectedMethod === "card" && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Saved Cards</h3>
                <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300">
                  <Plus className="w-4 h-4" />
                  <span>Add Card</span>
                </button>
              </div>
              <div className="space-y-3">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {card.type} •••• {card.last4}
                        </div>
                        <div className="text-slate-400 text-sm">Expires {card.expiry}</div>
                      </div>
                    </div>
                    {card.isDefault && (
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Default</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QR Code */}
          {selectedMethod === "qr" && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-4">Scan QR Code</h3>
              <div className="text-center">
                <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <img src="/placeholder.svg?height=192&width=192" alt="QR Code" className="w-40 h-40" />
                </div>
                <p className="text-slate-400 text-sm">Scan this code with your mobile app to pay</p>
                <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-white font-medium">${amount}</p>
                  <p className="text-slate-400 text-xs">Payment expires in 5 minutes</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Pay */}
          {selectedMethod === "mobile" && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-4">Mobile Payment</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <div className="text-white font-medium">Apple Pay</div>
                  </div>
                </button>
                <button className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🤖</div>
                    <div className="text-white font-medium">Google Pay</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Digital Wallet */}
          {selectedMethod === "wallet" && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-4">Digital Wallet</h3>
              <div className="space-y-3">
                <button className="w-full p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <span className="text-white font-medium">PayPal</span>
                  </div>
                </button>
                <button className="w-full p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <span className="text-white font-medium">Venmo</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-white font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">☕</div>
                  <div>
                    <div className="text-white font-medium">Caramel Macchiato</div>
                    <div className="text-slate-400 text-sm">Large • Extra Shot</div>
                  </div>
                </div>
                <span className="text-white font-medium">$5.45</span>
              </div>
              <div className="border-t border-slate-700 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">$5.45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">$0.44</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tip</span>
                  <span className="text-white">$1.00</span>
                </div>
                <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-slate-700">
                  <span className="text-white">Total</span>
                  <span className="text-white">$6.89</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Pay Now</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-slate-400 text-xs">🔒 Your payment information is secure and encrypted</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-white font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                  <div>
                    <div className="text-white text-sm font-medium">{order.item}</div>
                    <div className="text-slate-400 text-xs">
                      {order.date} • {order.status}
                    </div>
                  </div>
                  <span className="text-green-400 font-medium">{order.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export const dynamic = "force-dynamic";

export default function CheckoutVirtualPage() {
  const { user, addCard, addTransaction } = useAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("USDT");
  const [cardholderName, setCardholderName] = useState("");
  const [generatedCard, setGeneratedCard] = useState<any>(null);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const networks = [
    { id: "USDT", name: "USDT", icon: "₮", color: "bg-green-500", label: "Tether" },
    { id: "BTC", name: "Bitcoin", icon: "₿", color: "bg-orange-500", label: "Bitcoin" },
    { id: "ETH", name: "Ethereum", icon: "Ξ", color: "bg-purple-500", label: "Ethereum" },
  ];

  const amount = 49.99;
  const demoAddress = "TXa7kX9m2Yp3nL8qR5vW4jH6cB3dE1F8";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const fullNumber = "4532" + Math.floor(10000000 + Math.random() * 90000000).toString();
      const card = {
        last4: fullNumber.slice(-4),
        fullNumber,
        expiryDate: "12/28",
        cvv: Math.floor(100 + Math.random() * 900).toString(),
        cardholderName: cardholderName.trim() || "IZIPAY USER"
      };
      setGeneratedCard(card);
      addCard("virtual", cardholderName.trim() || "IZIPAY USER");
      addTransaction("Virtual Card Purchase", amount, "Virtual Card");
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 1500);
  };

  if (paymentComplete && generatedCard) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-[#88D65E]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#88D65E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Demo Payment Complete!</h2>
          <p className="text-gray-400 mb-6">Your demo virtual card is ready.</p>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-4 mb-6 text-white border border-gray-600">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-400">Card Number</span>
              <span className="text-xs font-bold">VISA</span>
            </div>
            <div className="text-xl font-mono tracking-widest mb-2">{generatedCard.fullNumber.replace(/(\d{4})/g, "$1 ").trim()}</div>
            <div className="flex justify-between text-xs">
              <span>{generatedCard.cardholderName}</span>
              <span>{generatedCard.expiryDate}</span>
            </div>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
            <p className="text-sm text-amber-400"><strong>Demo Mode:</strong> No real payment was processed.</p>
          </div>

          <div className="space-y-3">
            <Link href="/dashboard" className="block w-full py-3 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors">
              Go to Dashboard
            </Link>
            <Link href="/cards" className="block w-full py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors">
              View My Cards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <span className="px-2 py-1 bg-amber-500 text-black text-xs font-bold rounded">DEMO CHECKOUT</span>
          <span className="text-amber-400 text-sm">No real payment is processed • Sandbox environment</span>
        </div>
      </div>

      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="text-xl font-extrabold text-white">Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Secure Demo
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 lg:p-8 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-3 h-2 bg-black/30 rounded-sm"></div>
                    <span className="text-black text-[6px] font-bold">VISA</span>
                  </div>
                  <div className="text-black text-[6px] font-mono">••••</div>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">Virtual Card</h2>
                  <p className="text-sm text-gray-400">Demo card - instant delivery</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-sm font-medium text-gray-400 mb-4">What's included:</h3>
                <ul className="space-y-3">
                  {["Instant digital delivery", "Apple Pay & Google Pay", "No monthly fees", "Works globally", "Demo card - no real value"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-[#88D65E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-white mb-4">Cardholder Name</h2>
              <div className="mb-4">
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Enter name for demo card"
                  maxLength={24}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#88D65E] focus:ring-1 focus:ring-[#88D65E]"
                />
                <p className="text-xs text-gray-500 mt-2">Max 24 characters • Appears on demo card</p>
              </div>

              <h2 className="text-lg font-semibold text-white mb-4 mt-6">Select Demo Network</h2>
              <div className="grid grid-cols-3 gap-3">
                {networks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => setSelectedNetwork(network.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${selectedNetwork === network.id ? 'border-[#88D65E] bg-[#88D65E]/10' : 'border-gray-600 hover:border-gray-500'}`}
                  >
                    <div className={`w-10 h-10 ${network.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-white text-lg font-bold">{network.icon}</span>
                    </div>
                    <div className="text-sm font-medium text-white">{network.name}</div>
                    <div className="text-xs text-gray-400">{network.label}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-400">Demo Sandbox</p>
                    <p className="text-xs text-blue-300 mt-1">This is a test checkout. No real funds are collected.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Need help?</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors">
                    💬 Chat Support
                  </button>
                  <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors">
                    ✈️ Telegram
                  </button>
                  <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors">
                    📧 Email
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 lg:p-8 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-6">Payment Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Virtual Card (Demo)</span>
                  <span className="font-medium text-white">$49.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing Fee</span>
                  <span className="font-medium text-green-400">$0.00</span>
                </div>
                <div className="border-t border-gray-700 pt-4 flex justify-between">
                  <span className="font-semibold text-white">Demo Total</span>
                  <span className="font-extrabold text-xl text-[#88D65E]">$49.99</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Demo Amount ({selectedNetwork})
                </label>
                <div className="px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-lg font-mono text-white">
                  {amount} {selectedNetwork}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Demo Deposit Address</label>
                <div className="flex">
                  <input type="text" readOnly value={demoAddress} className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-l-xl text-sm font-mono text-gray-400" />
                  <button onClick={() => copyToClipboard(demoAddress)} className="px-4 py-3 bg-[#88D65E] text-black font-medium rounded-r-xl hover:bg-[#76C14D] transition-colors">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Demo QR Code</label>
                <div className="w-40 h-40 mx-auto bg-gray-900 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600">
                  <div className="text-center p-4">
                    <div className="w-20 h-20 mx-auto bg-white rounded-lg mb-2 grid grid-cols-5 gap-1 p-2">
                      {Array(25).fill(0).map((_, i) => (
                        <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-black' : 'bg-gray-300'}`}></div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Demo QR</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center mb-4">This is a demo checkout preview • No real funds will be collected</p>

              <button onClick={handlePaymentComplete} disabled={isProcessing} className="w-full py-4 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                {isProcessing ? (<><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>Processing...</>) : "Complete Demo Purchase"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
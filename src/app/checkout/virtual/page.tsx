"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function CheckoutVirtualPage() {
  const { user, addCard, addTransaction } = useAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("USDT");
  const [cardholderName, setCardholderName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [generatedCard, setGeneratedCard] = useState<any>(null);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const networks = [
    { id: "USDT", name: "USDT", icon: "₮", color: "bg-green-500" },
    { id: "BTC", name: "Bitcoin", icon: "₿", color: "bg-orange-500" },
    { id: "ETH", name: "Ethereum", icon: "Ξ", color: "bg-purple-500" },
  ];

  const amount = 49.99;
  const demoAddress = "TXa7kX9m2Yp3nL8qR5vW4jH6cB3dE1F8";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToPayment = () => {
    if (!cardholderName.trim()) {
      setCardholderName("IZIPAY USER");
    }
    setShowNameInput(false);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-[#88D65E]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#88D65E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-6">Your virtual card is ready to use.</p>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 mb-6 text-white">
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

          <div className="space-y-3">
            <Link href="/dashboard" className="block w-full py-3 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors">
              Go to Dashboard
            </Link>
            <Link href="/cards" className="block w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
              View My Cards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="text-xl font-extrabold text-gray-900">Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-3 h-2 bg-yellow-400 rounded-sm"></div>
                    <span className="text-white text-[6px] font-bold">VISA</span>
                  </div>
                  <div className="text-white text-[6px] font-mono">••••</div>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Virtual Card</h2>
                  <p className="text-sm text-gray-500">Instant digital delivery</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">What you get:</h3>
                <ul className="space-y-3">
                  {["Instant digital delivery", "Apple Pay & Google Pay", "No monthly fees", "Works globally", "Anonymous - No KYC"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-[#88D65E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cardholder Name</h2>
              <div className="mb-4">
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Enter cardholder name"
                  maxLength={24}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#88D65E] focus:ring-1 focus:ring-[#88D65E]"
                />
                <p className="text-xs text-gray-500 mt-2">Will appear on your card. Max 24 characters.</p>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Select Network</h2>
              <div className="grid grid-cols-3 gap-3">
                {networks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => setSelectedNetwork(network.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${selectedNetwork === network.id ? 'border-[#88D65E] bg-[#88D65E]/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`w-10 h-10 ${network.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-white text-lg font-bold">{network.icon}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{network.name}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Demo Mode</p>
                    <p className="text-xs text-amber-700 mt-1">This is a demo. Click "I have completed payment" to simulate.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Virtual Card</span>
                  <span className="font-medium text-gray-900">$49.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Fee</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-extrabold text-xl text-gray-900">$49.99</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to send ({selectedNetwork})
                </label>
                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-mono text-gray-900">
                  {amount} {selectedNetwork}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Address ({selectedNetwork})</label>
                <div className="flex">
                  <input type="text" readOnly value={demoAddress} className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-l-xl text-sm font-mono text-gray-600" />
                  <button onClick={() => copyToClipboard(demoAddress)} className="px-4 py-3 bg-gray-900 text-white rounded-r-xl hover:bg-gray-800 transition-colors">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Scan QR Code</label>
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center p-4">
                    <div className="w-20 h-20 mx-auto bg-gray-800 rounded-lg mb-2 grid grid-cols-5 gap-1 p-2">
                      {Array(25).fill(0).map((_, i) => (
                        <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-gray-600'}`}></div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Scan to pay</p>
                  </div>
                </div>
              </div>

              <button onClick={handlePaymentComplete} disabled={isProcessing} className="w-full py-4 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                {isProcessing ? (<><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>Processing...</>) : "I have completed payment"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">Your card will be activated immediately after payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
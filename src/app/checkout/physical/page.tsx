"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function CheckoutPhysicalPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const demoAddress = "TXb8nY3jZ8pL9mR4vW6kX1cH2dA7eF9G";
  const demoQrData = "izipay://pay/demo-physical-card-459.99";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 1500);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-[#88D65E]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#88D65E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 mb-6">Your physical metal card is being prepared. Delivery in 5-7 business days.</p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
            <p className="text-lg font-mono font-semibold text-gray-900">IZP-9927-METAL</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full py-3 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/cards"
              className="block w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
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
            <Link href="/cards" className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="text-xl font-extrabold text-gray-900">Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-[#88D65E] rounded-full"></span>
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-2 flex flex-col justify-between border border-gray-600">
                  <div className="flex justify-between">
                    <div className="w-3 h-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm"></div>
                    <span className="text-white text-[6px] font-bold">VISA</span>
                  </div>
                  <div className="text-white text-[6px] font-mono">••••</div>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Physical Metal Card</h2>
                  <p className="text-sm text-gray-500">5-7 business days delivery</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">What you get:</h3>
                <ul className="space-y-2">
                  {["Stainless steel metal design", "Premium card holder included", "Contactless payments", "Priority customer support", "2-year warranty"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#88D65E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-[#88D65E] rounded-xl cursor-pointer bg-[#88D65E]/5">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-[#88D65E]" />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">Crypto Deposit</span>
                    <p className="text-sm text-gray-500">Send USDT, BTC, or ETH to your wallet</p>
                  </div>
                </label>
                
                <div className="flex items-center p-4 border border-gray-200 rounded-xl cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" disabled className="w-4 h-4" />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">Credit Card</span>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Demo Mode</p>
                    <p className="text-xs text-amber-700 mt-1">This is a demo checkout. Use any of the placeholder addresses below to simulate payment.</p>
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
                  <span className="text-gray-600">Physical Metal Card</span>
                  <span className="font-medium text-gray-900">$459.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Express Shipping</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-extrabold text-xl text-gray-900">$459.99</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Address (USDT TRC-20)</label>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={demoAddress}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-l-xl text-sm font-mono text-gray-600"
                  />
                  <button
                    onClick={() => copyToClipboard(demoAddress)}
                    className="px-4 py-3 bg-gray-900 text-white rounded-r-xl hover:bg-gray-800 transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Scan QR Code</label>
                <div className="w-40 h-40 mx-auto bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h2m10 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="text-xs text-gray-400">Demo QR</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePaymentComplete}
                disabled={isProcessing}
                className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "I have completed payment"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By clicking above, you confirm that you have sent the payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
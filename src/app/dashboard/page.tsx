"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#88D65E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#88D65E] flex items-center justify-center">
                <span className="text-xl font-bold text-black">i</span>
              </div>
              <span className="text-xl font-extrabold text-black">IZIPAY</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black">Dashboard</Link>
              <Link href="/virtual-card" className="text-sm font-medium text-gray-600 hover:text-black">Cards</Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-black">Pricing</Link>
              <Link href="/security" className="text-sm font-medium text-gray-600 hover:text-black">Security</Link>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#88D65E] flex items-center justify-center">
                  <span className="text-sm font-bold text-black">{user.name?.charAt(0) || "U"}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? "..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-black">Welcome back, {user.name}!</h1>
          <p className="text-gray-500 mt-1">Manage your crypto cards and wallet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Total Balance</span>
              <div className="w-10 h-10 rounded-xl bg-[#88D65E]/10 flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-black">$0.00</div>
            <div className="text-xs text-gray-400 mt-1">0.00 USDT</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Active Cards</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-lg">💳</span>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-black">0</div>
            <div className="text-xs text-gray-400 mt-1">Virtual: 0 | Physical: 0</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Total Spent</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
            </div>
            <div className="text-2xl font-extrabold text-black">$0.00</div>
            <div className="text-xs text-gray-400 mt-1">This month</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 p-1">
              {["overview", "cards", "transactions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab
                      ? "bg-[#88D65E] text-black"
                      : "text-gray-500 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">No cards yet</h3>
                <p className="text-gray-500 mb-4">Get your first virtual card to start spending crypto</p>
                <Link
                  href="/virtual-card"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors"
                >
                  Get Virtual Card - $49
                </Link>
              </div>
            )}

            {activeTab === "cards" && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-black mb-2">Your Cards</h3>
                <p className="text-gray-500">No cards created yet</p>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-black mb-2">Transactions</h3>
                <p className="text-gray-500">No transactions yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#88D65E]/10 to-blue-500/10 rounded-2xl p-6 border border-[#88D65E]/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#88D65E] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎁</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-1">Get $10 bonus!</h3>
              <p className="text-gray-600 text-sm mb-3">Invite a friend and both get $10 when they make their first transaction.</p>
              <button className="text-sm font-medium text-[#88D65E] hover:underline">
                Copy your referral link →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
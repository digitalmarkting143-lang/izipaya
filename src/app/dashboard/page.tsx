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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#88D65E] flex items-center justify-center">
                  <span className="text-xl font-bold text-black">i</span>
                </div>
                <span className="text-xl font-extrabold text-black">IZIPAY</span>
              </Link>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#88D65E]/10 text-[#88D65E] font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </Link>
              <Link href="/cards" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                My Cards
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Transactions
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Deposit
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
            </nav>
            
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 min-h-screen">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between h-16 px-6">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex-1 lg:flex-none"></div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#88D65E] flex items-center justify-center">
                    <span className="text-sm font-bold text-black">{user.name?.charAt(0) || "U"}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-8">
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage your crypto cards and wallet</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">Total Balance</span>
                  <div className="w-10 h-10 rounded-xl bg-[#88D65E]/10 flex items-center justify-center">
                    <span className="text-lg">💰</span>
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-gray-900">$0.00</div>
                <div className="text-xs text-gray-400 mt-1">0.00 USDT</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">Active Cards</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="text-lg">💳</span>
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-gray-900">0</div>
                <div className="text-xs text-gray-400 mt-1">Virtual: 0 | Physical: 0</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">Total Spent</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <span className="text-lg">📊</span>
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-gray-900">$0.00</div>
                <div className="text-xs text-gray-400 mt-1">This month</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
              <div className="border-b border-gray-100">
                <div className="flex gap-1 p-2 overflow-x-auto">
                  {["overview", "cards", "transactions"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
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

              <div className="p-6 lg:p-8">
                {activeTab === "overview" && (
                  <div className="text-center py-8 lg:py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">💳</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No cards yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">Get your first virtual card to start spending crypto instantly, anywhere in the world.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link
                        href="/checkout/virtual"
                        className="px-6 py-3 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors"
                      >
                        Buy Virtual Card - $49
                      </Link>
                      <Link
                        href="/checkout/physical"
                        className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        Buy Physical Card - $459
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === "cards" && (
                  <div className="text-center py-8 lg:py-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Cards</h3>
                    <p className="text-gray-500 mb-6">No cards purchased yet</p>
                    <Link
                      href="/cards"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors"
                    >
                      Browse Cards
                    </Link>
                  </div>
                )}

                {activeTab === "transactions" && (
                  <div className="text-center py-8 lg:py-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Transactions</h3>
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
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Get $10 bonus!</h3>
                  <p className="text-gray-600 text-sm mb-3">Invite a friend and both get $10 when they make their first transaction.</p>
                  <button className="text-sm font-medium text-[#88D65E] hover:underline">
                    Copy your referral link →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { CardDetailsModal } from "@/components/CardDetailsModal";

export default function DashboardPage() {
  const { user, logout, cards, transactions, toggleCardNumberVisibility } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
  };

  const virtualCard = cards.find(c => c.type === "virtual");
  const physicalCard = cards.find(c => c.type === "physical");
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                Dashboard
              </Link>
              <Link href="/cards" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                My Cards
              </Link>
              <button onClick={() => setActiveTab("transactions")} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                Transactions
              </button>
              <button onClick={() => setActiveTab("settings")} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Settings
              </button>
            </nav>
            
            <div className="p-4 border-t border-gray-100">
              <button onClick={handleLogout} disabled={isLoggingOut} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 min-h-screen">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between h-16 px-6">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <div className="flex-1"></div>
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
              <p className="text-gray-500 mt-1">Welcome back, {user.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Total Balance</span>
                  <div className="w-10 h-10 rounded-xl bg-[#88D65E]/10 flex items-center justify-center"><span className="text-lg">💰</span></div>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">$0.00</div>
                <div className="text-xs text-gray-400 mt-1">0.00 USDT</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Active Cards</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><span className="text-lg">💳</span></div>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">{cards.filter(c => c.status === "active").length}</div>
                <div className="text-xs text-gray-400 mt-1">Virtual: {cards.filter(c => c.type === "virtual").length} | Physical: {cards.filter(c => c.type === "physical").length}</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Total Spent</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><span className="text-lg">📊</span></div>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">${totalSpent.toFixed(2)}</div>
                <div className="text-xs text-gray-400 mt-1">All time</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Frozen</span>
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><span className="text-lg">❄️</span></div>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">{cards.filter(c => c.status === "frozen").length}</div>
                <div className="text-xs text-gray-400 mt-1">Cards frozen</div>
              </div>
            </div>

            {activeTab === "overview" && (
              <>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
                  <div className="p-6 lg:p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Cards</h2>
                    
                    {cards.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">💳</span></div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No cards yet</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">Get your first virtual card to start spending crypto instantly.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                          <Link href="/checkout/virtual" className="px-6 py-3 bg-[#88D65E] text-black font-semibold rounded-xl hover:bg-[#76C14D] transition-colors">Buy Virtual Card - $49</Link>
                          <Link href="/checkout/physical" className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">Buy Physical Card - $459</Link>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cards.map((card) => (
                          <div key={card.id} className={`relative bg-gradient-to-br ${card.type === "physical" ? "from-gray-700 via-gray-800 to-gray-900" : "from-gray-800 to-gray-900"} rounded-2xl p-6 text-white ${card.status === "frozen" ? "opacity-75" : ""}`}>
                            {card.status === "frozen" && (
                              <div className="absolute top-4 right-4 px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">Frozen</div>
                            )}
                            {card.status === "ordered" && (
                              <div className="absolute top-4 right-4 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">Ordered</div>
                            )}
                            {card.status === "active" && (
                              <div className="absolute top-4 right-4 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">Active</div>
                            )}
                            
                            <div className="flex justify-between items-start mb-8">
                              <div className="w-10 h-6 bg-yellow-400 rounded-sm"></div>
                              <span className="text-xs font-bold">VISA</span>
                            </div>
                            
                            <div className="text-xl font-mono tracking-widest mb-4">
                              {card.isNumberVisible ? card.fullNumber.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• •••• " + card.last4}
                            </div>
                            
                            <div className="flex justify-between items-end mb-4">
                              <div>
                                <div className="text-xs text-gray-400">Card Holder</div>
                                <div className="text-sm font-medium">{card.cardholderName}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">Expires</div>
                                <div className="text-sm font-medium">{card.expiryDate}</div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4">
                              <button onClick={() => toggleCardNumberVisibility(card.id)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-xs">
                                {card.isNumberVisible ? "Hide" : "Show"}
                              </button>
                              <button onClick={() => copyToClipboard(card.fullNumber)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-xs">
                                Copy
                              </button>
                              <button onClick={() => setSelectedCardId(card.id)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-xs">
                                Details
                              </button>
                            </div>
                            
                            {card.type === "physical" && (
                              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-transparent rounded-full"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {transactions.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <div className="p-6 lg:p-8">
                      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h2>
                      <div className="space-y-4">
                        {transactions.slice(0, 5).map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><span className="text-lg">💳</span></div>
                              <div>
                                <div className="font-medium text-gray-900">{tx.type}</div>
                                <div className="text-sm text-gray-500">{tx.date}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">-${tx.amount.toFixed(2)}</div>
                              <div className="text-sm text-green-500">{tx.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "transactions" && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 lg:p-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">All Transactions</h2>
                  {transactions.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">📋</span></div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
                      <p className="text-gray-500">Your transaction history will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center"><span className="text-xl">💳</span></div>
                            <div>
                              <div className="font-medium text-gray-900">{tx.type}</div>
                              <div className="text-sm text-gray-500">{tx.date}</div>
                              <div className="text-xs text-gray-400">{tx.cardType}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">-${tx.amount.toFixed(2)}</div>
                            <div className="text-sm text-green-500 capitalize">{tx.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 lg:p-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900">Email</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-full">Verified</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900">Account Status</div>
                        <div className="text-sm text-gray-500">Demo Account</div>
                      </div>
                      <span className="px-3 py-1 bg-[#88D65E]/10 text-[#88D65E] text-sm font-medium rounded-full">Active</span>
                    </div>
                    <div className="py-4">
                      <button onClick={handleLogout} className="px-6 py-3 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors">Sign Out</button>
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-sm text-amber-800"><strong>Demo Mode:</strong> This is a demonstration environment. Data persists locally in your browser.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 bg-gradient-to-r from-[#88D65E]/10 to-blue-500/10 rounded-2xl p-6 border border-[#88D65E]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#88D65E] flex items-center justify-center flex-shrink-0"><span className="text-xl">🎁</span></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Get $10 bonus!</h3>
                  <p className="text-gray-600 text-sm mb-3">Invite a friend and both get $10 when they make their first transaction.</p>
                  <button className="text-sm font-medium text-[#88D65E] hover:underline">Copy your referral link →</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {selectedCardId && <CardDetailsModal cardId={selectedCardId} onClose={() => setSelectedCardId(null)} />}
    </div>
  );
}
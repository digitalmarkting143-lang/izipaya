"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("overview");

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#88D65E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#88D65E] to-[#76C14D] flex items-center justify-center">
                <span className="text-xl font-bold text-black">i</span>
              </div>
              <span className="text-xl font-extrabold text-black">IZIPAY</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab("overview")} className={`text-sm font-semibold transition-colors ${activeTab === "overview" ? "text-[#88D65E]" : "text-gray-600 hover:text-black"}`}>Overview</button>
              <button onClick={() => setActiveTab("cards")} className={`text-sm font-semibold transition-colors ${activeTab === "cards" ? "text-[#88D65E]" : "text-gray-600 hover:text-black"}`}>Cards</button>
              <button onClick={() => setActiveTab("wallet")} className={`text-sm font-semibold transition-colors ${activeTab === "wallet" ? "text-[#88D65E]" : "text-gray-600 hover:text-black"}`}>Wallet</button>
              <button onClick={() => setActiveTab("transactions")} className={`text-sm font-semibold transition-colors ${activeTab === "transactions" ? "text-[#88D65E]" : "text-gray-600 hover:text-black"}`}>Transactions</button>
            </nav>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#88D65E] to-[#76C14D] flex items-center justify-center">
                  <span className="text-sm font-bold text-black">{session.user?.name?.[0] || session.user?.email?.[0] || "U"}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-black">{session.user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
              </div>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Sign Out</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-black mb-2">Welcome back, {session.user?.name?.split(" ")[0] || "User"}!</h1>
          <p className="text-gray-600">Here's an overview of your account</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(136,214,94,0.15)] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#88D65E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Cards</p>
            <p className="text-2xl font-extrabold text-black">2</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Balance</p>
            <p className="text-2xl font-extrabold text-black">$0.00</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Spent</p>
            <p className="text-2xl font-extrabold text-black">$0.00</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Saved</p>
            <p className="text-2xl font-extrabold text-black">$0.00</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-black">Your Cards</h2>
              <button className="text-sm font-semibold text-[#88D65E] hover:text-[#76C14D]">+ Add New</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl p-5 text-white">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded"></div>
                  <span className="text-xs font-semibold bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                </div>
                <div className="text-lg font-mono tracking-wider mb-4">•••• •••• •••• 4242</div>
                <div className="flex justify-between items-end">
                  <div className="text-xs">IZIPAY VIRTUAL</div>
                  <div className="text-xs">$5,000 limit</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#2d2d44] to-[#1a1a2e] rounded-xl p-5 text-white">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded"></div>
                  <span className="text-xs font-semibold bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Pending</span>
                </div>
                <div className="text-lg font-mono tracking-wider mb-4">•••• •••• •••• 8888</div>
                <div className="flex justify-between items-end">
                  <div className="text-xs">IZIPAY PHYSICAL</div>
                  <div className="text-xs">Delivering...</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-extrabold text-black mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-[rgba(136,214,94,0.1)] hover:bg-[rgba(136,214,94,0.2)] rounded-xl text-left transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#88D65E] flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </div>
                <p className="font-semibold text-black">Add Funds</p>
              </button>

              <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1" /></svg>
                </div>
                <p className="font-semibold text-gray-700">Buy Crypto</p>
              </button>

              <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <p className="font-semibold text-gray-700">New Virtual Card</p>
              </button>

              <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <p className="font-semibold text-gray-700">Order Physical</p>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-black">Recent Transactions</h2>
            <button className="text-sm font-semibold text-gray-500 hover:text-black">View All</button>
          </div>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <p className="text-gray-500 mb-2">No transactions yet</p>
            <p className="text-sm text-gray-400">Your transaction history will appear here</p>
          </div>
        </div>
      </main>
    </div>
  );
}
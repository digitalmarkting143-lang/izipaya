"use client";
export const dynamic = "force-dynamic";

import { useAdmin } from "@/lib/admin-context";

export default function AdminDashboard() {
  const { users, tickets, orders, logs } = useAdmin();

  const activeUsers = users.filter(u => u.status === "active").length;
  const restrictedUsers = users.filter(u => u.status === "restricted" || u.status === "suspended").length;
  const openTickets = tickets.filter(t => t.status === "open").length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const completedOrders = orders.filter(o => o.status === "completed").length;

  const stats = [
    { label: "Total Users", value: users.length, icon: "users", color: "blue" },
    { label: "Active Users", value: activeUsers, icon: "check", color: "green" },
    { label: "Restricted Users", value: restrictedUsers, icon: "warning", color: "red" },
    { label: "Open Tickets", value: openTickets, icon: "ticket", color: "orange" },
    { label: "Demo Orders", value: completedOrders, icon: "cart", color: "purple" },
  ];

  const recentLogs = logs.slice(0, 5);

  const getIcon = (icon: string) => {
    const icons: Record<string, JSX.Element> = {
      users: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      check: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      warning: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
      ticket: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
      cart: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    };
    return icons[icon];
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-500/20 text-blue-400",
      green: "bg-green-500/20 text-green-400",
      red: "bg-red-500/20 text-red-400",
      orange: "bg-orange-500/20 text-orange-400",
      purple: "bg-purple-500/20 text-purple-400",
    };
    return colors[color];
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-extrabold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClass(stat.color)}`}>
                {getIcon(stat.icon)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <a href="/admin/logs" className="text-sm text-[#88D65E] hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {recentLogs.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent activity</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#88D65E]"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{log.details}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{log.adminName} • {new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Orders Overview</h2>
            <a href="/admin/orders" className="text-sm text-[#88D65E] hover:underline">View all</a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/30 rounded-lg">
              <p className="text-2xl font-bold text-white">{pendingOrders}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
            <div className="p-4 bg-gray-900/30 rounded-lg">
              <p className="text-2xl font-bold text-green-400">{completedOrders}</p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
            <div className="p-4 bg-gray-900/30 rounded-lg">
              <p className="text-2xl font-bold text-red-400">{orders.filter(o => o.status === "failed").length}</p>
              <p className="text-sm text-gray-400">Failed</p>
            </div>
            <div className="p-4 bg-gray-900/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-400">{orders.filter(o => o.status === "refunded").length}</p>
              <p className="text-sm text-gray-400">Refunded</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-400">
            <span className="font-semibold">Demo Mode:</span> This is a demonstration admin panel. Data is stored in localStorage and will reset on browser clear.
          </p>
        </div>
      </div>
    </div>
  );
}
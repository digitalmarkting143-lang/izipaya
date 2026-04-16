"use client";
import { useState } from "react";
import { useAdmin } from "@/lib/admin-context";

export default function OrdersPage() {
  const { orders } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.userName.toLowerCase().includes(search.toLowerCase()) ||
                          order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-orange-500/20 text-orange-400",
      completed: "bg-green-500/20 text-green-400",
      failed: "bg-red-500/20 text-red-400",
      refunded: "bg-gray-500/20 text-gray-400",
    };
    return styles[status] || styles.pending;
  };

  const stats = [
    { label: "Total Orders", value: orders.length, color: "text-white" },
    { label: "Pending", value: orders.filter(o => o.status === "pending").length, color: "text-orange-400" },
    { label: "Completed", value: orders.filter(o => o.status === "completed").length, color: "text-green-400" },
    { label: "Revenue", value: `$${orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.amount, 0).toFixed(2)}`, color: "text-[#88D65E]" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Orders Monitor</h1>
          <p className="text-gray-400 mt-1">Demo-only read-only order monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-400">
            <span className="font-semibold">Read-Only Demo:</span> This is a demonstration monitor. No real payment processing, wallet editing, or card activation controls.
          </p>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl">
        <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by order ID or user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">No orders found</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-4 py-4">
                      <span className="text-white font-mono text-sm">{order.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-white text-sm">{order.userName}</p>
                        <p className="text-xs text-gray-500">{order.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.type === "physical" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {order.type === "physical" ? "Physical" : "Virtual"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-white font-semibold">${order.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm max-w-xs truncate">
                      {order.notes}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
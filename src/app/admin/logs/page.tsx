"use client";
import { useState } from "react";
import { useAdmin } from "@/lib/admin-context";

export default function LogsPage() {
  const { logs } = useAdmin();
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const actionTypes = Array.from(new Set(logs.map(l => l.action)));

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.target.toLowerCase().includes(search.toLowerCase()) ||
                          log.adminName.toLowerCase().includes(search.toLowerCase()) ||
                          log.details.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const getActionBadge = (action: string) => {
    const styles: Record<string, string> = {
      login: "bg-green-500/20 text-green-400",
      logout: "bg-gray-500/20 text-gray-400",
      user_create: "bg-blue-500/20 text-blue-400",
      user_update: "bg-orange-500/20 text-orange-400",
      user_delete: "bg-red-500/20 text-red-400",
      role_update: "bg-purple-500/20 text-purple-400",
      menu_create: "bg-cyan-500/20 text-cyan-400",
      menu_update: "bg-cyan-500/20 text-cyan-400",
      menu_delete: "bg-red-500/20 text-red-400",
      menu_reorder: "bg-cyan-500/20 text-cyan-400",
      settings_update: "bg-yellow-500/20 text-yellow-400",
      ticket_update: "bg-blue-500/20 text-blue-400",
    };
    return styles[action] || "bg-gray-500/20 text-gray-400";
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Activity Logs</h1>
          <p className="text-gray-400 mt-1">Audit trail of admin actions</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredLogs.length} entries
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
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E]"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
          >
            <option value="all">All Actions</option>
            {actionTypes.map(action => (
              <option key={action} value={action}>{formatAction(action)}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Admin</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Action</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Target</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">No logs found</td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-4 py-4 text-gray-400 text-sm whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#88D65E] flex items-center justify-center">
                          <span className="text-xs font-bold text-black">{log.adminName.charAt(0)}</span>
                        </div>
                        <span className="text-white text-sm">{log.adminName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getActionBadge(log.action)}`}>
                        {formatAction(log.action)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-300 text-sm">{log.target}</td>
                    <td className="px-4 py-4 text-gray-400 text-sm max-w-xs truncate">{log.details}</td>
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
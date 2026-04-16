"use client";
import { useState } from "react";
import { useAdmin, Ticket } from "@/lib/admin-context";

export default function SupportPage() {
  const { tickets, updateTicket, addTicketMessage, admin } = useAdmin();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTickets = tickets.filter(t => statusFilter === "all" || t.status === statusFilter);

  const handleSendReply = () => {
    if (!selectedTicket || !replyMessage.trim()) return;
    addTicketMessage(selectedTicket.id, replyMessage, isInternal);
    setReplyMessage("");
    const updatedTicket = tickets.find(t => t.id === selectedTicket.id);
    if (updatedTicket) setSelectedTicket(updatedTicket);
  };

  const handleStatusChange = (ticketId: string, newStatus: "open" | "pending" | "resolved") => {
    updateTicket(ticketId, { status: newStatus });
  };

  const handleAssign = (ticketId: string, assignee: string) => {
    updateTicket(ticketId, { assignedTo: assignee });
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      high: "bg-red-500/20 text-red-400",
      medium: "bg-orange-500/20 text-orange-400",
      low: "bg-blue-500/20 text-blue-400",
    };
    return styles[priority] || styles.low;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: "bg-blue-500/20 text-blue-400",
      pending: "bg-orange-500/20 text-orange-400",
      resolved: "bg-green-500/20 text-green-400",
    };
    return styles[status] || styles.open;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Support Tickets</h1>
          <p className="text-gray-400 mt-1">Manage customer support tickets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl">
            <div className="p-4 border-b border-gray-700">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#88D65E]"
              >
                <option value="all">All Tickets</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
              {filteredTickets.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No tickets found</div>
              ) : (
                filteredTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`w-full text-left p-4 hover:bg-gray-700/30 transition-colors ${
                      selectedTicket?.id === ticket.id ? "bg-gray-700/50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-white font-medium text-sm truncate flex-1">{ticket.subject}</p>
                      <span className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(ticket.status)}`}>{ticket.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{ticket.user} • {new Date(ticket.createdAt).toLocaleDateString()}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${getPriorityBadge(ticket.priority)}`}>{ticket.priority}</span>
                      {ticket.assignedTo && <span className="text-xs text-gray-500">→ {ticket.assignedTo}</span>}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedTicket.subject}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    From: {selectedTicket.user} ({selectedTicket.userEmail})
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value as any)}
                    className="px-3 py-1.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#88D65E]"
                  >
                    <option value="open">Open</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Assign to..."
                    value={selectedTicket.assignedTo || ""}
                    onChange={(e) => handleAssign(selectedTicket.id, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#88D65E]"
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                {selectedTicket.messages.map((msg) => (
                  <div key={msg.id} className={`p-4 rounded-lg ${msg.isInternal ? "bg-yellow-500/10 border border-yellow-500/20" : msg.from === "admin" ? "bg-[#88D65E]/10 border border-[#88D65E]/20" : "bg-gray-900/30"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${msg.from === "admin" ? "text-[#88D65E]" : "text-white"}`}>
                        {msg.from === "admin" ? (msg.isInternal ? "Internal Note" : "Support") : selectedTicket.user}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-300">{msg.message}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-700">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E] resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-gray-400">Internal note (not visible to user)</span>
                  </label>
                  <button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim()}
                    className="px-4 py-2 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="text-gray-500">Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
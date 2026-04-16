"use client";
import { useState } from "react";
import { useAdmin, AdminUser } from "@/lib/admin-context";

export default function UsersPage() {
  const { users, updateUser, deleteUser, addUser, hasPermission, addLog } = useAdmin();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [newUser, setNewUser] = useState({ email: "", name: "", role: "user", status: "active" as const });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddUser = () => {
    if (!newUser.email || !newUser.name) return;
    addUser(newUser);
    setShowAddModal(false);
    setNewUser({ email: "", name: "", role: "user", status: "active" });
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    updateUser(selectedUser.id, selectedUser);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    deleteUser(selectedUser.id);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleStatusChange = (userId: string, newStatus: "active" | "suspended" | "restricted") => {
    updateUser(userId, { status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-500/20 text-green-400",
      suspended: "bg-red-500/20 text-red-400",
      restricted: "bg-orange-500/20 text-orange-400",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || styles.active}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Users</h1>
          <p className="text-gray-400 mt-1">Manage platform users</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl">
        <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
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
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="restricted">Restricted</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Joined</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">No users found</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#88D65E] flex items-center justify-center">
                          <span className="text-sm font-bold text-black">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        (user as any).provider === "google" 
                          ? "bg-blue-500/20 text-blue-400" 
                          : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {(user as any).provider === "google" ? "Google" : "Email"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-300 capitalize">{user.role}</span>
                    </td>
                    <td className="px-4 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-4 text-gray-400 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedUser(user); setShowEditModal(true); }}
                          className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleStatusChange(user.id, user.status === "active" ? "suspended" : "active")}
                          className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${user.status === "active" ? "text-orange-400 hover:text-orange-300" : "text-green-400 hover:text-green-300"}`}
                          title={user.status === "active" ? "Suspend" : "Reactivate"}
                        >
                          {user.status === "active" ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}
                          className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Cancel</button>
              <button onClick={handleAddUser} className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors">Add User</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setShowEditModal(false); setSelectedUser(null); }} className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Cancel</button>
              <button onClick={handleUpdateUser} className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-2">Delete User</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to delete {selectedUser.name}? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setShowDeleteModal(false); setSelectedUser(null); }} className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Cancel</button>
              <button onClick={handleDeleteUser} className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
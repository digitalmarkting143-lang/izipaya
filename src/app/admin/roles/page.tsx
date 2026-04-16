"use client";
import { useState } from "react";
import { useAdmin, Role } from "@/lib/admin-context";

const ALL_PERMISSIONS = [
  { key: "view_users", label: "View Users" },
  { key: "edit_users", label: "Edit Users" },
  { key: "restrict_users", label: "Restrict Users" },
  { key: "delete_users", label: "Delete Users" },
  { key: "edit_menus", label: "Edit Menus" },
  { key: "manage_settings", label: "Manage Settings" },
  { key: "view_logs", label: "View Logs" },
  { key: "manage_orders", label: "Manage Orders" },
  { key: "manage_tickets", label: "Manage Tickets" },
  { key: "manage_roles", label: "Manage Roles" },
  { key: "manage_integrations", label: "Manage Integrations" },
];

export default function RolesPage() {
  const { roles, updateRole, addLog } = useAdmin();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleTogglePermission = (permissionKey: string) => {
    if (!selectedRole) return;
    
    const hasPermission = selectedRole.permissions.includes(permissionKey);
    const newPermissions = hasPermission
      ? selectedRole.permissions.filter(p => p !== permissionKey)
      : [...selectedRole.permissions, permissionKey];
    
    updateRole(selectedRole.id, { permissions: newPermissions });
    setSelectedRole({ ...selectedRole, permissions: newPermissions });
  };

  const getRoleBadge = (roleName: string) => {
    const colors: Record<string, string> = {
      "Super Admin": "bg-purple-500/20 text-purple-400",
      "Admin": "bg-blue-500/20 text-blue-400",
      "Support Manager": "bg-green-500/20 text-green-400",
      "Content Manager": "bg-orange-500/20 text-orange-400",
      "Analyst": "bg-gray-500/20 text-gray-400",
    };
    return colors[roleName] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Roles & Permissions</h1>
          <p className="text-gray-400 mt-1">Manage roles and their permissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Roles</h2>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => { setSelectedRole(role); setShowEditModal(true); }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedRole?.id === role.id
                      ? "bg-[#88D65E]/20 border border-[#88D65E]/50"
                      : "bg-gray-900/30 hover:bg-gray-700/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{role.name}</p>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleBadge(role.name)}`}>
                      {role.permissions.length} perms
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Permissions</h2>
            {selectedRole ? (
              <div className="space-y-3">
                <p className="text-gray-400 text-sm mb-4">Managing permissions for: <span className="text-white font-medium">{selectedRole.name}</span></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ALL_PERMISSIONS.map((perm) => {
                    const isEnabled = selectedRole.permissions.includes(perm.key);
                    return (
                      <button
                        key={perm.key}
                        onClick={() => handleTogglePermission(perm.key)}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          isEnabled
                            ? "bg-[#88D65E]/10 border-[#88D65E]/50"
                            : "bg-gray-900/30 border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <span className={`text-sm ${isEnabled ? "text-white" : "text-gray-400"}`}>{perm.label}</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${isEnabled ? "bg-[#88D65E]" : "bg-gray-700"}`}>
                          {isEnabled && (
                            <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p>Select a role to view and edit permissions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && selectedRole && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">Edit Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role Name</label>
                <input
                  type="text"
                  value={selectedRole.name}
                  onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={selectedRole.description}
                  onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E] resize-none"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => { setShowEditModal(false); setSelectedRole(null); }} 
                className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  updateRole(selectedRole.id, { name: selectedRole.name, description: selectedRole.description });
                  setShowEditModal(false);
                }} 
                className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
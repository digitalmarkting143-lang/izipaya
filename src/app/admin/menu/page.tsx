"use client";
import { useState } from "react";
import { useAdmin, MenuItem } from "@/lib/admin-context";

export default function MenuPage() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, reorderMenuItems } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({ label: "", icon: "dashboard", path: "", visible: true });

  const sortedItems = [...menuItems].sort((a, b) => a.order - b.order);

  const handleAddItem = () => {
    if (!newItem.label || !newItem.path) return;
    addMenuItem(newItem);
    setShowAddModal(false);
    setNewItem({ label: "", icon: "dashboard", path: "", visible: true });
  };

  const handleUpdateItem = () => {
    if (!selectedItem) return;
    updateMenuItem(selectedItem.id, selectedItem);
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      deleteMenuItem(id);
    }
  };

  const handleToggleVisibility = (item: MenuItem) => {
    updateMenuItem(item.id, { visible: !item.visible });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const items = [...sortedItems];
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    const reordered = items.map((item, idx) => ({ ...item, order: idx + 1 }));
    reorderMenuItems(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === sortedItems.length - 1) return;
    const items = [...sortedItems];
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    const reordered = items.map((item, idx) => ({ ...item, order: idx + 1 }));
    reorderMenuItems(reordered);
  };

  const iconOptions = [
    { value: "dashboard", label: "Dashboard" },
    { value: "people", label: "Users" },
    { value: "security", label: "Security" },
    { value: "menu", label: "Menu" },
    { value: "shopping_cart", label: "Orders" },
    { value: "support_agent", label: "Support" },
    { value: "integration_instructions", label: "Integrations" },
    { value: "description", label: "Logs" },
    { value: "settings", label: "Settings" },
    { value: "home", label: "Home" },
    { value: "credit_card", label: "Cards" },
    { value: "analytics", label: "Analytics" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Menu Manager</h1>
          <p className="text-gray-400 mt-1">Manage navigation menu items</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Menu Item
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <p className="text-sm text-gray-400">Drag to reorder or use arrow buttons. Toggle visibility to show/hide items.</p>
        </div>
        <div className="divide-y divide-gray-700">
          {sortedItems.map((item, index) => (
            <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-gray-700/20 transition-colors">
              <div className="flex flex-col gap-1">
                <button onClick={() => handleMoveUp(index)} disabled={index === 0} className="p-1 hover:bg-gray-700 rounded disabled:opacity-30">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button onClick={() => handleMoveDown(index)} disabled={index === sortedItems.length - 1} className="p-1 hover:bg-gray-700 rounded disabled:opacity-30">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
              
              <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center">
                <span className="text-xs text-gray-400">{index + 1}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-sm text-gray-500 truncate">{item.path}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleVisibility(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    item.visible 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {item.visible ? "Visible" : "Hidden"}
                </button>
                
                <button
                  onClick={() => { setSelectedItem(item); setShowEditModal(true); }}
                  className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">Add Menu Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
                <input
                  type="text"
                  value={newItem.label}
                  onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                  placeholder="Menu label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Path</label>
                <input
                  type="text"
                  value={newItem.path}
                  onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                  placeholder="/admin/path"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                <select
                  value={newItem.icon}
                  onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                >
                  {iconOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItem.visible}
                  onChange={(e) => setNewItem({ ...newItem, visible: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#88D65E] focus:ring-[#88D65E]"
                />
                <span className="text-sm text-gray-300">Visible by default</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Cancel</button>
              <button onClick={handleAddItem} className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors">Add Item</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">Edit Menu Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
                <input
                  type="text"
                  value={selectedItem.label}
                  onChange={(e) => setSelectedItem({ ...selectedItem, label: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Path</label>
                <input
                  type="text"
                  value={selectedItem.path}
                  onChange={(e) => setSelectedItem({ ...selectedItem, path: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                <select
                  value={selectedItem.icon}
                  onChange={(e) => setSelectedItem({ ...selectedItem, icon: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
                >
                  {iconOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItem.visible}
                  onChange={(e) => setSelectedItem({ ...selectedItem, visible: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#88D65E] focus:ring-[#88D65E]"
                />
                <span className="text-sm text-gray-300">Visible</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setShowEditModal(false); setSelectedItem(null); }} className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Cancel</button>
              <button onClick={handleUpdateItem} className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
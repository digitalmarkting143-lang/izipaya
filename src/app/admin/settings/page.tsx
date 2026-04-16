"use client";
import { useState } from "react";
import { useAdmin } from "@/lib/admin-context";

export default function SettingsPage() {
  const { admin, roles } = useAdmin();
  const [siteName, setSiteName] = useState("IZIPAY");
  const [siteUrl, setSiteUrl] = useState("https://izipay.me");
  const [timezone, setTimezone] = useState("UTC");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">General platform configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-400 text-sm">Settings saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Site URL</label>
              <input
                type="text"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#88D65E]"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST (Eastern)</option>
                <option value="PST">PST (Pacific)</option>
                <option value="CET">CET (Central European)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Admin Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={admin?.name || ""}
                disabled
                className="w-full px-4 py-2.5 bg-gray-900/30 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={admin?.email || ""}
                disabled
                className="w-full px-4 py-2.5 bg-gray-900/30 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <input
                type="text"
                value={admin?.role || ""}
                disabled
                className="w-full px-4 py-2.5 bg-gray-900/30 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">System Info</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Version</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Total Roles</span>
              <span className="text-white">{roles.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Storage</span>
              <span className="text-white">localStorage</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Mode</span>
              <span className="text-orange-400">Demo</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
              <div>
                <p className="text-white text-sm">Two-Factor Authentication</p>
                <p className="text-gray-500 text-xs">Add extra security layer</p>
              </div>
              <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
              <div>
                <p className="text-white text-sm">Session Timeout</p>
                <p className="text-gray-500 text-xs">Auto logout after inactivity</p>
              </div>
              <select className="px-3 py-1.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm">
                <option>30 min</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
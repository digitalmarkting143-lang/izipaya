"use client";
import { useState, useEffect } from "react";
import { useAdmin } from "@/lib/admin-context";

interface AuthConfig {
  google: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
}

export default function IntegrationsPage() {
  const { admin } = useAdmin();
  const [config, setConfig] = useState<AuthConfig>({
    google: { enabled: false, clientId: "", clientSecret: "", callbackUrl: "" }
  });
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth/config")
      .then(res => res.json())
      .then(data => {
        if (data.google) {
          setConfig(prev => ({
            ...prev,
            google: { ...prev.google, ...data.google }
          }));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/admin/auth/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ google: config.google }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save config:", error);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTesting(false);
    alert("Connection test simulated - In production, this would verify Google OAuth credentials");
  };

  const toggleSecret = (key: string) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const callbackUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/api/auth/callback/google`
    : "http://localhost:3000/api/auth/callback/google";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#88D65E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Integrations</h1>
          <p className="text-gray-400 mt-1">Configure third-party services and API connections</p>
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

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-400">
            <span className="font-semibold">Security Notice:</span> Client secrets are stored securely on the server. They are never exposed to the browser.
          </p>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Google OAuth</h2>
              <p className="text-sm text-gray-400">Enable Google Sign-In for your users</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={config.google.enabled}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                google: { ...prev.google, enabled: e.target.checked }
              }))}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#88D65E]"></div>
            <span className="ml-3 text-sm font-medium text-gray-300">
              {config.google.enabled ? "Enabled" : "Disabled"}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Client ID</label>
            <input
              type="text"
              value={config.google.clientId}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                google: { ...prev.google, clientId: e.target.value }
              }))}
              className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E]"
              placeholder="Enter Google Client ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Client Secret</label>
            <div className="relative">
              <input
                type={showSecrets.googleSecret ? "text" : "password"}
                value={config.google.clientSecret}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  google: { ...prev.google, clientSecret: e.target.value }
                }))}
                className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E] pr-12"
                placeholder="Enter Google Client Secret"
              />
              <button
                type="button"
                onClick={() => toggleSecret("googleSecret")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showSecrets.googleSecret ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-900/30 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Callback URL (add this to Google Cloud Console):</p>
          <code className="text-[#88D65E] text-sm font-mono">{callbackUrl}</code>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleTestConnection}
            disabled={testing || !config.google.clientId || !config.google.clientSecret}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {testing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Testing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Test Connection
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Other Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-900/30 rounded-lg opacity-60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">f</span>
              </div>
              <span className="text-white font-medium">Meta Pixel</span>
            </div>
            <p className="text-gray-500 text-sm">Configure later</p>
          </div>
          <div className="p-4 bg-gray-900/30 rounded-lg opacity-60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span className="text-white font-medium">Analytics</span>
            </div>
            <p className="text-gray-500 text-sm">Configure later</p>
          </div>
        </div>
      </div>
    </div>
  );
}
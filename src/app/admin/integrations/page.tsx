"use client";
import { useState, useEffect } from "react";

interface AuthConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  configured: boolean;
  callbackUrl: string;
}

export default function IntegrationsPage() {
  const [config, setConfig] = useState<AuthConfig>({
    enabled: false,
    clientId: "",
    clientSecret: "",
    configured: false,
    callbackUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth/config")
      .then(res => res.json())
      .then(data => {
        if (data.google) {
          setConfig(prev => ({
            ...prev,
            ...data.google,
          }));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!config.clientId.trim() || !config.clientSecret.trim()) {
      setError("Please enter both Client ID and Client Secret");
      return;
    }

    setError("");
    setSaving(true);
    
    try {
      const res = await fetch("/api/admin/auth/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled: true,
          clientId: config.clientId.trim(),
          clientSecret: config.clientSecret.trim(),
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSaved(true);
        setConfig(prev => ({
          ...prev,
          enabled: true,
          configured: true,
        }));
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.message || "Failed to save configuration");
      }
    } catch (err) {
      setError("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    if (!confirm("Are you sure you want to clear the Google OAuth configuration?")) {
      return;
    }
    
    try {
      await fetch("/api/admin/auth/config", { method: "DELETE" });
      setConfig({
        enabled: false,
        clientId: "",
        clientSecret: "",
        configured: false,
        callbackUrl: config.callbackUrl,
      });
    } catch (err) {
      console.error("Failed to clear config:", err);
    }
  };

  const callbackUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/api/auth/callback/google`
    : "https://sandybrown-stinkbug-922112.hostingersite.com/api/auth/callback/google";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#88D65E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-white">Integrations</h1>
        <p className="text-gray-400 mt-1">Configure third-party services and API connections</p>
      </div>

      {saved && (
        <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-400 text-sm">Configuration saved successfully!</span>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="H22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
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
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            config.configured 
              ? "bg-green-500/20 text-green-400" 
              : "bg-gray-600/50 text-gray-400"
          }`}>
            {config.configured ? "Configured" : "Not Configured"}
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Client ID</label>
              <input
                type="text"
                value={config.clientId}
                onChange={(e) => {
                  setConfig(prev => ({ ...prev, clientId: e.target.value }));
                  setSaved(false);
                }}
                className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E]"
                placeholder="Enter Google Client ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Client Secret</label>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  value={config.clientSecret}
                  onChange={(e) => {
                    setConfig(prev => ({ ...prev, clientSecret: e.target.value }));
                    setSaved(false);
                  }}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E] pr-12"
                  placeholder="Enter Google Client Secret"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-sm"
                >
                  {showSecret ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-900/30 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Callback URL (add to Google Cloud Console)</p>
            <code className="text-[#88D65E] text-sm font-mono">{callbackUrl}</code>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !config.clientId.trim() || !config.clientSecret.trim()}
              className="px-4 py-2.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Configuration
                </>
              )}
            </button>
            
            {config.configured && (
              <button
                onClick={handleClear}
                className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Configuration
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Setup Instructions</h3>
        <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
          <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-[#88D65E] hover:underline">Google Cloud Console</a></li>
          <li>Create or select a project</li>
          <li>Go to APIs & Services → Credentials</li>
          <li>Create OAuth 2.0 Client ID credentials</li>
          <li>Add Authorized JavaScript origins:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li><code className="text-[#88D65E]">http://localhost:3000</code></li>
              <li><code className="text-[#88D65E]">https://sandybrown-stinkbug-922112.hostingersite.com</code></li>
            </ul>
          </li>
          <li>Add Authorized redirect URIs:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li><code className="text-[#88D65E]">{callbackUrl}</code></li>
            </ul>
          </li>
          <li>Copy Client ID and Client Secret and paste above</li>
          <li>Click Save Configuration</li>
        </ol>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-6">
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
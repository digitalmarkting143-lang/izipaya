"use client";
import { useState, useEffect } from "react";

interface AuthConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  configured: boolean;
}

export default function IntegrationsPage() {
  const [config, setConfig] = useState<AuthConfig>({
    enabled: false,
    clientId: "",
    clientSecret: "",
    callbackUrl: "",
    configured: false,
  });
  const [loading, setLoading] = useState(true);

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

      {config.configured ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-green-400 text-sm">
            <span className="font-semibold">Google OAuth is configured</span> and ready to use.
          </p>
        </div>
      ) : (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-yellow-400 text-sm">
            <span className="font-semibold">Google OAuth is not configured</span>. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your environment variables.
          </p>
        </div>
      )}

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
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
          <div className="ml-auto">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              config.configured 
                ? "bg-green-500/20 text-green-400" 
                : "bg-gray-600/50 text-gray-400"
            }`}>
              {config.configured ? "Configured" : "Not Configured"}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-900/30 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Client ID</p>
                <p className="text-white font-mono text-sm">
                  {config.configured ? config.clientId : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Client Secret</p>
                <p className="text-white font-mono text-sm">
                  {config.configured ? config.clientSecret : "••••••••••••"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-900/30 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Callback URL (add to Google Cloud Console)</p>
            <code className="text-[#88D65E] text-sm font-mono">{callbackUrl}</code>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-400 font-medium mb-2">Setup Instructions:</p>
            <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-[#88D65E] hover:underline">Google Cloud Console</a></li>
              <li>Create a new project or select existing</li>
              <li>Enable OAuth 2.0 and create credentials</li>
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
              <li>Add environment variables: <code className="text-[#88D65E]">GOOGLE_CLIENT_ID</code> and <code className="text-[#88D65E]">GOOGLE_CLIENT_SECRET</code></li>
              <li>Restart the application</li>
            </ol>
          </div>
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
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const passwordRequirements = [
    { met: password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(password), text: "One uppercase letter" },
    { met: /[a-z]/.test(password), text: "One lowercase letter" },
    { met: /[0-9]/.test(password), text: "One number" },
    { met: /[^A-Za-z0-9]/.test(password), text: "One special character" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => req.met);
    if (!allRequirementsMet) {
      setError("Please meet all password requirements");
      return;
    }

    setIsLoading(true);
    const success = await register(email, password, name);
    setIsLoading(false);
    
    if (success) {
      router.push("/dashboard");
    } else {
      setError("An account with this email already exists");
    }
  };

  const handleGoogleLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError("Google sign-in is not configured. Please contact the administrator.");
      return;
    }
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-[#88D65E] flex items-center justify-center">
              <span className="text-xl font-bold text-black">i</span>
            </div>
            <span className="text-xl font-extrabold text-white">IZIPAY</span>
          </Link>

          <h1 className="text-2xl font-extrabold mb-2 text-white">Create your account</h1>
          <p className="text-gray-400 text-sm mb-8">Start spending crypto instantly with no KYC</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E] focus:ring-1 focus:ring-[#88D65E] transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E] focus:ring-1 focus:ring-[#88D65E] transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E] focus:ring-1 focus:ring-[#88D65E] transition-all pr-12"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              
              {password && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className={`flex items-center gap-2 text-xs ${req.met ? "text-[#88D65E]" : "text-gray-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${req.met ? "bg-[#88D65E]" : "bg-gray-600"}`}></span>
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#88D65E] focus:ring-1 focus:ring-[#88D65E] transition-all"
                placeholder="Confirm your password"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-2 text-xs text-red-400">Passwords do not match</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#88D65E] focus:ring-[#88D65E] focus:ring-offset-0"
                />
                <span className="text-sm text-gray-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#88D65E] hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#88D65E] hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingEmails}
                  onChange={(e) => setMarketingEmails(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#88D65E] focus:ring-[#88D65E] focus:ring-offset-0"
                />
                <span className="text-sm text-gray-400">
                  Send me product updates and news
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#88D65E] hover:bg-[#76C14D] text-black font-semibold rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500">or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            className="w-full py-3.5 px-4 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#88D65E] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#88D65E]/10 via-blue-500/10 to-purple-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#88D65E]/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="text-center max-w-lg px-8">
            <div className="w-72 h-44 mx-auto mb-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-[#88D65E]/20 border border-gray-800">
              <div className="flex justify-between items-start">
                <div className="w-10 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm"></div>
                <div className="text-white text-xs font-bold">VISA</div>
              </div>
              <div className="text-white text-lg font-mono tracking-widest">•••• •••• •••• 8831</div>
              <div className="flex justify-between items-end">
                <div className="text-white text-xs">IZIPAY USER</div>
                <div className="text-white text-xs">12/28</div>
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold text-white mb-4">Join IZIPAY</h2>
            <p className="text-gray-400 max-w-md mx-auto">Get instant virtual cards. Spend crypto anywhere. No bank account needed.</p>
            
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-[#88D65E] mb-1">$49</div>
                <div className="text-xs text-gray-500">Virtual Card</div>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-[#88D65E] mb-1">0</div>
                <div className="text-xs text-gray-500">KYC Required</div>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <div className="text-2xl font-bold text-[#88D65E] mb-1">∞</div>
                <div className="text-xs text-gray-500">Global Use</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
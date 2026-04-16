import { NextResponse } from "next/server";

const AUTH_CONFIG_KEY = "izipay_auth_config";

export async function GET() {
  const stored = typeof window !== "undefined" ? localStorage.getItem(AUTH_CONFIG_KEY) : null;
  const defaultConfig = { 
    google: { 
      enabled: false, 
      clientId: "", 
      clientSecret: "",
      callbackUrl: process.env.NEXTAUTH_URL 
        ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
        : "http://localhost:3000/api/auth/callback/google"
    } 
  };
  
  const config = stored ? JSON.parse(stored) : defaultConfig;
  
  return NextResponse.json({
    google: {
      enabled: config.google?.enabled || false,
      clientId: config.google?.clientId ? "configured" : "",
      callbackUrl: config.google?.callbackUrl || defaultConfig.google.callbackUrl,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { google } = body;

    const config = {
      google: {
        enabled: google?.enabled || false,
        clientId: google?.clientId || "",
        clientSecret: google?.clientSecret || "",
        callbackUrl: process.env.NEXTAUTH_URL 
          ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
          : "http://localhost:3000/api/auth/callback/google"
      },
      updatedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_CONFIG_KEY, JSON.stringify(config));
    }

    return NextResponse.json({ success: true, message: "Auth config saved" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to save config" },
      { status: 500 }
    );
  }
}
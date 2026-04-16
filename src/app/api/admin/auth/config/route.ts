import { NextResponse } from "next/server";

export async function GET() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  const isConfigured = googleClientId.length > 0 && googleClientSecret.length > 0;
  const nextauthUrl = process.env.NEXTAUTH_URL || "https://sandybrown-stinkbug-922112.hostingersite.com";
  const callbackUrl = `${nextauthUrl}/api/auth/callback/google`;

  return NextResponse.json({
    google: {
      enabled: isConfigured,
      clientId: isConfigured ? googleClientId.slice(0, 8) + "..." : "",
      clientSecret: isConfigured ? "••••••••••••" : "",
      callbackUrl,
      configured: isConfigured,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { google } = body;

    if (!google?.clientId || !google?.clientSecret) {
      return NextResponse.json(
        { success: false, message: "Client ID and Secret are required. Configure in environment variables." },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Google credentials must be set via environment variables (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET). Not stored in database for security." 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}
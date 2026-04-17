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
      configured: isConfigured,
      callbackUrl,
      message: isConfigured 
        ? "Google OAuth is configured via environment variables" 
        : "Configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your hosting environment",
    },
  });
}

export async function POST(request: Request) {
  return NextResponse.json({
    success: false,
    message: "Google OAuth credentials must be set via environment variables on your hosting provider (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET). Not stored in database for security.",
  }, { status: 400 });
}

export async function DELETE() {
  return NextResponse.json({
    success: false,
    message: "Cannot clear configuration. Remove environment variables from your hosting provider.",
  }, { status: 400 });
}
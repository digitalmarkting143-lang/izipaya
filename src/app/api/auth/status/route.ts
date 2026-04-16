import { NextResponse } from "next/server";

export async function GET() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
  const isConfigured = googleClientId.length > 0;

  return NextResponse.json({ configured: isConfigured });
}
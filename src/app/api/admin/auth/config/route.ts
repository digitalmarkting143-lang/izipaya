import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONFIG_FILE = path.join(process.cwd(), "auth-config.json");

function readConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading config:", e);
  }
  return { google: { enabled: false, clientId: "", clientSecret: "" } };
}

function writeConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    return true;
  } catch (e) {
    console.error("Error writing config:", e);
    return false;
  }
}

export async function GET() {
  const config = readConfig();
  const google = config.google || { enabled: false, clientId: "", clientSecret: "" };
  
  return NextResponse.json({
    google: {
      enabled: google.enabled,
      clientId: google.clientId ? google.clientId.slice(0, 8) + "..." : "",
      clientSecret: google.clientSecret ? "••••••••••••" : "",
      configured: google.clientId.length > 0 && google.clientSecret.length > 0,
      callbackUrl: `${process.env.NEXTAUTH_URL || "https://sandybrown-stinkbug-922112.hostingersite.com"}/api/auth/callback/google`,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { enabled, clientId, clientSecret } = body;
    
    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { success: false, message: "Client ID and Client Secret are required" },
        { status: 400 }
      );
    }
    
    const config = {
      google: {
        enabled: enabled ?? true,
        clientId,
        clientSecret,
      },
    };
    
    const success = writeConfig(config);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: "Google OAuth configuration saved successfully" 
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to save configuration" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const config = { google: { enabled: false, clientId: "", clientSecret: "" } };
  writeConfig(config);
  return NextResponse.json({ success: true, message: "Configuration cleared" });
}
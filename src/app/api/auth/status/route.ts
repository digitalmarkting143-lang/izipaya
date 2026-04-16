import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONFIG_FILE = path.join(process.cwd(), "auth-config.json");

export async function GET() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      const config = JSON.parse(data);
      const google = config.google || {};
      const isConfigured = google.clientId?.length > 0 && google.clientSecret?.length > 0;
      return NextResponse.json({ configured: isConfigured, enabled: google.enabled || false });
    }
  } catch (e) {
    console.error("Error reading config:", e);
  }
  return NextResponse.json({ configured: false, enabled: false });
}
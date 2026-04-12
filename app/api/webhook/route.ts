import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "news.json");

// Make sure data folder exists
import { mkdirSync } from "fs";
try {
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
} catch {}

// POST — n8n sends summaries here
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // body coming from n8n will be array of summaries
    const articles = Array.isArray(body) ? body : [body];

    const payload = {
      updatedAt: new Date().toISOString(),
      articles,
    };

    writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2));
    console.log("✅ News updated from n8n:", articles.length, "articles");

    return NextResponse.json({ success: true, count: articles.length });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
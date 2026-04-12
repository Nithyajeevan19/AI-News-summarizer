import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "news.json");

export async function GET() {
  try {
    if (!existsSync(DATA_FILE)) {
      return NextResponse.json({ articles: [], updatedAt: null });
    }

    const raw = readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ articles: [], updatedAt: null });
  }
}
// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("BODY:", body);
    const articles = body.articles ?? (Array.isArray(body) ? body : [body]);

    if (!articles.length) {
      return NextResponse.json(
        { success: false, error: "No articles" },
        { status: 400 }
      );
    }

    // Delete old articles
    await pool.query(`DELETE FROM articles`);

    // Insert all new articles
    for (const article of articles) {
      await pool.query(
  `INSERT INTO articles (title, summary, url, image_url)
   VALUES ($1, $2, $3, $4)`,
  [
    article.title,
    article.summary,
    article.link,        // map link → url
    article.imageUrl ?? null
  ]
   );
    }

    console.log(`✅ Saved ${articles.length} articles to Postgres`);
    return NextResponse.json({ success: true, count: articles.length });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { success: false, error: "Server crashed" },
      { status: 500 }
    );
  }
}
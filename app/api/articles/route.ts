// app/api/articles/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM articles
      ORDER BY created_at DESC
    `);
    const dbCheck = await pool.query(`SELECT current_database();`);
console.log("DB:", dbCheck.rows);

    return NextResponse.json({
      articles: result.rows,
      updatedAt: result.rows[0]?.created_at ?? null,
    });

  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { articles: [], updatedAt: null },
      { status: 500 }
    );
  }
}
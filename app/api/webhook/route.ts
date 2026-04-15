import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const articles = Array.isArray(body) ? body : [body];

    return NextResponse.json({
      success: true,
      count: articles.length,
    });

  } catch (error) {
    console.error("Webhook Error:", error);

    return NextResponse.json(
      { success: false, error: "Server crashed" },
      { status: 500 }
    );
  }
}
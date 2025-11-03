import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET() {
  return NextResponse.json({ markup: db.getMarkup() });
}

export async function POST(req: Request) {
  const { markup } = await req.json();
  db.setMarkup(Number(markup));
  return NextResponse.json({ success: true, markup });
}

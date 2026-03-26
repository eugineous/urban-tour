import { NextRequest, NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/db";
import type { Testimonial } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const pub = req.nextUrl.searchParams.get("published");
  let items = readJson<Testimonial>("testimonials.json");
  if (pub === "true") items = items.filter((t) => t.published);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = readJson<Testimonial>("testimonials.json");
  const now = new Date().toISOString();
  const item: Testimonial = {
    id: uuidv4(),
    authorName: body.authorName ?? "",
    authorRole: body.authorRole ?? "Student",
    schoolId: body.schoolId ?? "",
    eventId: body.eventId ?? "",
    quote: body.quote ?? "",
    photoUrl: body.photoUrl ?? null,
    published: body.published ?? false,
    createdAt: now,
    updatedAt: now,
  };
  items.push(item);
  writeJson("testimonials.json", items);
  return NextResponse.json(item, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/db";
import type { Event } from "@/lib/types";
import { getDefaultProgramme } from "@/lib/programme";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const events = readJson<Event>("events.json");
  const now = new Date();
  // Auto-complete past events
  const updated = events.map((e) => {
    if (e.status === "Upcoming" && new Date(e.date) < now) return { ...e, status: "Completed" as const };
    return e;
  });
  writeJson("events.json", updated);
  return NextResponse.json(updated.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const events = readJson<Event>("events.json");
  const now = new Date().toISOString();
  const event: Event = {
    id: uuidv4(),
    schoolId: body.schoolId ?? "",
    date: body.date ?? "",
    time: body.time ?? "10:00",
    venue: body.venue ?? "",
    status: "Upcoming",
    programme: getDefaultProgramme(),
    awards: [],
    crew: [],
    artists: [],
    highlightSummary: body.highlightSummary ?? "",
    photos: [],
    createdAt: now,
    updatedAt: now,
  };
  events.push(event);
  writeJson("events.json", events);
  return NextResponse.json(event, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/db";
import type { TeamMember } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  return NextResponse.json(readJson<TeamMember>("team.json"));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const team = readJson<TeamMember>("team.json");
  const member: TeamMember = { id: uuidv4(), name: body.name ?? "", role: body.role ?? "", phone: body.phone ?? "", email: body.email ?? "" };
  team.push(member);
  writeJson("team.json", team);
  return NextResponse.json(member, { status: 201 });
}

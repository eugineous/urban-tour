import { NextRequest, NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/db";
import type { School } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  let schools = readJson<School>("schools.json");
  if (status) schools = schools.filter((s) => s.status === status);
  return NextResponse.json(schools);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const schools = readJson<School>("schools.json");
  const now = new Date().toISOString();
  const school: School = {
    id: uuidv4(),
    name: body.name ?? "",
    county: body.county ?? "",
    principalName: body.principalName ?? "",
    deputyPrincipalName: body.deputyPrincipalName ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    notes: body.notes ?? "",
    status: body.status ?? "Pitched",
    createdAt: now,
    updatedAt: now,
  };
  schools.push(school);
  writeJson("schools.json", schools);
  return NextResponse.json(school, { status: 201 });
}

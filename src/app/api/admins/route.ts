import { NextResponse } from "next/server";
import { readJson } from "@/lib/db";
import type { Admin } from "@/lib/types";

export async function GET() {
  return NextResponse.json(readJson<Admin>("admins.json"));
}

import { v4 as uuidv4 } from "uuid";
import type { ProgrammePhase } from "./types";

export const DEFAULT_PROGRAMME: Omit<ProgrammePhase, "id">[] = [
  { title: "Grand Opening & Opening Ceremony", startTime: "10:00", endTime: "10:53", description: "MCs take the stage, National Anthem, School Anthem, Opening Prayer, Principal's Address, Deputy Principal's Address, MC Hype Set.", order: 1 },
  { title: "Talent Showcase Part 1 — Choir, Gospel, Poetry", startTime: "11:05", endTime: "12:40", description: "Choir Performance, Gospel Category, Hype Set #2, Poetry Category.", order: 2 },
  { title: "Drama & Midday Break", startTime: "13:10", endTime: "14:10", description: "Drama Category performances, Midday Break with DJ Xavi set.", order: 3 },
  { title: "Talent Showcase Part 2 — Rap, Dance", startTime: "14:10", endTime: "15:45", description: "Rap Category, Pre-Dance Set by Nyarangi + Dancers, Dance Category.", order: 4 },
  { title: "Modeling Showcase — Driq Academy", startTime: "15:45", endTime: "16:40", description: "Cultural/Traditional Wear, Creative Wear, Cosplay, Professional Wear, Special Guest Walk, Hype Set #3.", order: 5 },
  { title: "Church, Teacher Competition & Closing", startTime: "16:40", endTime: "17:30", description: "Mental Health Sermon, Teacher Dance Competition, Awards Ceremony, Closing Remarks, Post-Show Content.", order: 6 },
];

export function getDefaultProgramme(): ProgrammePhase[] {
  return DEFAULT_PROGRAMME.map((p) => ({ ...p, id: uuidv4() }));
}

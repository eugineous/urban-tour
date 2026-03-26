export type OutreachStatus = "Pitched" | "Confirmed" | "Scheduled" | "Completed";
export type AdminStatus = "pending" | "approved" | "rejected";
export type AuthorRole = "Principal" | "Teacher" | "Student";
export type TalentCategory = "Choir" | "Gospel" | "Poetry" | "Drama" | "Rap" | "Dance" | "Modeling";
export type AwardType = "Certificate" | "Gift Hamper";
export type EventStatus = "Upcoming" | "Completed" | "Cancelled";

export interface School {
  id: string;
  name: string;
  county: string;
  principalName: string;
  deputyPrincipalName: string;
  email: string;
  phone: string;
  notes: string;
  status: OutreachStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProgrammePhase {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  order: number;
}

export interface Award {
  id: string;
  studentName: string;
  school: string;
  category: TalentCategory;
  awardType: AwardType;
  placement: string;
}

export interface CrewAssignment {
  teamMemberId: string;
  role: string;
}

export interface GuestArtist {
  id: string;
  name: string;
  performanceSlot: string;
  contactDetails: string;
}

export interface Event {
  id: string;
  schoolId: string;
  date: string;
  time: string;
  venue: string;
  status: EventStatus;
  programme: ProgrammePhase[];
  awards: Award[];
  crew: CrewAssignment[];
  artists: GuestArtist[];
  highlightSummary: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: AuthorRole;
  schoolId: string;
  eventId: string;
  quote: string;
  photoUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  image: string | null;
  status: AdminStatus;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

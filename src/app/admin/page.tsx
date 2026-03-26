import { readJson } from "@/lib/db";
import type { School, Event, Testimonial } from "@/lib/types";
import Link from "next/link";
import CountdownWidget from "@/components/CountdownWidget";

export default function AdminHome() {
  const schools = readJson<School>("schools.json");
  const events = readJson<Event>("events.json");
  const testimonials = readJson<Testimonial>("testimonials.json");

  const upcoming = events
    .filter((e) => e.status === "Upcoming" && new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nextEvent = upcoming[0];
  const nextSchool = nextEvent ? schools.find((s) => s.id === nextEvent.schoolId) : null;

  const stats = [
    { label: "Schools in Pipeline", value: schools.length, color: "neon-lime", href: "/admin/schools" },
    { label: "Upcoming Events", value: upcoming.length, color: "neon-electric", href: "/admin/events" },
    { label: "Completed Events", value: events.filter((e) => e.status === "Completed").length, color: "neon-pink", href: "/admin/events" },
    { label: "Testimonials", value: testimonials.length, color: "text-yellow-400", href: "/admin/testimonials" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-graffiti text-5xl neon-lime" style={{ textShadow: "0 0 20px #AAFF00" }}>
          THE COMMAND CENTRE
        </h1>
        <p className="text-gray-400 mt-1">Urban Tour Operations Dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <div className="card hover:border-white/20 transition-all cursor-pointer">
              <p className={`font-graffiti text-4xl ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Next event countdown */}
      {nextEvent && nextSchool && (
        <div className="card" style={{ border: "1px solid rgba(170,255,0,0.25)" }}>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Next Stop 🎤</p>
          <h2 className="font-graffiti text-3xl text-white mb-1">{nextSchool.name}</h2>
          <p className="text-sm text-gray-400 mb-4">{nextEvent.date} · {nextEvent.time} · {nextEvent.venue}</p>
          <CountdownWidget targetDate={nextEvent.date} />
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h2 className="font-graffiti text-2xl text-white mb-4">QUICK MOVES</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/admin/schools" className="card text-center hover:border-lime/30 transition-all cursor-pointer">
            <div className="text-2xl mb-1">🏫</div>
            <p className="text-sm font-semibold">Add School</p>
          </Link>
          <Link href="/admin/events" className="card text-center hover:border-electric/30 transition-all cursor-pointer">
            <div className="text-2xl mb-1">📅</div>
            <p className="text-sm font-semibold">Schedule Event</p>
          </Link>
          <Link href="/admin/ai-tools" className="card text-center hover:border-pink/30 transition-all cursor-pointer">
            <div className="text-2xl mb-1">🤖</div>
            <p className="text-sm font-semibold">Generate Doc</p>
          </Link>
          <Link href="/admin/testimonials" className="card text-center hover:border-yellow-400/30 transition-all cursor-pointer">
            <div className="text-2xl mb-1">💬</div>
            <p className="text-sm font-semibold">Add Testimonial</p>
          </Link>
        </div>
      </div>

      {/* School pipeline */}
      <div>
        <h2 className="font-graffiti text-2xl text-white mb-4">SCHOOL PIPELINE</h2>
        <div className="space-y-2">
          {schools.slice(0, 5).map((school) => (
            <Link key={school.id} href={`/admin/schools/${school.id}`}>
              <div className="card flex items-center justify-between hover:border-white/20 transition-all cursor-pointer">
                <div>
                  <p className="font-semibold text-sm">{school.name}</p>
                  <p className="text-xs text-gray-500">{school.county} · {school.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full status-${school.status.toLowerCase()}`}>
                  {school.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

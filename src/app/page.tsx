import { readJson } from "@/lib/db";
import type { Event, School, Testimonial } from "@/lib/types";
import Link from "next/link";

export default function PublicPage() {
  const events = readJson<Event>("events.json");
  const schools = readJson<School>("schools.json");
  const testimonials = readJson<Testimonial>("testimonials.json");

  const completed = events
    .filter((e) => e.status === "Completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const upcoming = events
    .filter((e) => e.status === "Upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const published = testimonials.filter((t) => t.published);
  const schoolMap = Object.fromEntries(schools.map((s) => [s.id, s.name]));

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1a0a2e 50%, #0A0A0A 100%)" }}>
      {/* Hero */}
      <header className="text-center py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #AAFF00 0, #AAFF00 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10">
          <h1 className="font-graffiti text-8xl md:text-9xl neon-lime" style={{ textShadow: "0 0 40px #AAFF00, 0 0 80px rgba(170,255,0,0.3)" }}>
            URBAN
          </h1>
          <h1 className="font-graffiti text-8xl md:text-9xl text-white -mt-4" style={{ textShadow: "0 0 40px rgba(255,255,255,0.5)" }}>
            TOUR
          </h1>
          <p className="text-lg text-gray-300 mt-4 font-medium">High School Talent Search</p>
          <p className="text-sm text-gray-500 mt-1">Urban News on PPP TV Kenya · 400,000+ Daily Viewers</p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link href="/login" className="btn-lime font-graffiti text-lg tracking-wider px-8 py-3">
              ADMIN LOGIN
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20 space-y-16">
        {/* Upcoming events */}
        {upcoming.length > 0 && (
          <section>
            <h2 className="font-graffiti text-4xl neon-electric mb-6">COMING SOON 🔥</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {upcoming.map((event) => (
                <div key={event.id} className="card" style={{ border: "1px solid rgba(0,191,255,0.2)" }}>
                  <p className="font-graffiti text-xl text-white">{schoolMap[event.schoolId] ?? "TBA"}</p>
                  <p className="text-sm text-electric mt-1">{event.date} · {event.time}</p>
                  {event.venue && <p className="text-xs text-gray-400 mt-1">{event.venue}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Completed events */}
        {completed.length > 0 && (
          <section>
            <h2 className="font-graffiti text-4xl neon-lime mb-6">WE&apos;VE BEEN TO 📍</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {completed.map((event) => (
                <div key={event.id} className="card hover:border-white/20 transition-all" style={{ border: "1px solid rgba(170,255,0,0.1)" }}>
                  <p className="font-graffiti text-xl text-white">{schoolMap[event.schoolId] ?? "School"}</p>
                  <p className="text-sm text-lime mt-1">{event.date}</p>
                  {event.highlightSummary && <p className="text-xs text-gray-400 mt-2">{event.highlightSummary}</p>}
                  <div className="flex gap-3 mt-3 text-xs text-gray-500">
                    <span>🏆 {event.awards.length} awards</span>
                    <span>👥 {event.crew.length} crew</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {published.length > 0 && (
          <section>
            <h2 className="font-graffiti text-4xl neon-pink mb-6">WHAT THEY SAY 💬</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {published.map((t) => (
                <div key={t.id} className="card" style={{ border: "1px solid rgba(255,0,128,0.15)" }}>
                  <p className="text-sm text-gray-200 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-xs font-semibold text-white">{t.authorName}</p>
                    <p className="text-xs text-gray-500">{t.authorRole} · {schoolMap[t.schoolId] ?? ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* About */}
        <section className="card text-center py-12" style={{ border: "1px solid rgba(170,255,0,0.1)" }}>
          <h2 className="font-graffiti text-3xl neon-lime mb-4">ABOUT URBAN TOUR</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
            Urban Tour is a professional television production by Urban News on PPP TV Kenya. We visit one high school at a time, where students compete in talent categories including Choir, Gospel, Poetry, Drama, Rap, Dance, and Modeling. The best performances are broadcast to over 400,000 daily viewers nationwide.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            {[["400K+", "Daily Viewers"], ["PPP TV", "Kenya"], ["0 Cost", "To Schools"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="font-graffiti text-3xl neon-lime">{val}</p>
                <p className="text-xs text-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center py-8 border-t border-white/5">
        <p className="text-xs text-gray-600">Urban Tour · Urban News on PPP TV Kenya · Hosted by Eugine Micah & Lucy Ogunde</p>
      </footer>
    </div>
  );
}

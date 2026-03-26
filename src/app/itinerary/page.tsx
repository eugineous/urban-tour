import { readJson } from "@/lib/db";
import type { Event, School } from "@/lib/types";
import PublicNav from "@/components/PublicNav";
import CountdownWidget from "@/components/CountdownWidget";

export default function ItineraryPage() {
  const events = readJson<Event>("events.json");
  const schools = readJson<School>("schools.json");
  const sm = Object.fromEntries(schools.map(s => [s.id, s.name]));

  const upcoming = events.filter(e => e.status === "Upcoming").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completed = events.filter(e => e.status === "Completed").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PublicNav />
      <div style={{ paddingTop: "70px" }}>
        {/* Page header */}
        <div style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "4rem 2rem 3rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#00BFFF", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>The Schedule</p>
            <h1 style={{ fontFamily: "Bangers,cursive", fontSize: "clamp(3rem,8vw,6rem)", color: "white", letterSpacing: "0.05em", lineHeight: 1 }}>ITINERARY</h1>
            <div style={{ width: "60px", height: "3px", background: "#00BFFF", margin: "1rem 0 1rem" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem" }}>Where Urban Tour is headed next</p>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}>
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div style={{ marginBottom: "5rem" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#AAFF00", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>Upcoming Shows</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
                {upcoming.map((ev, i) => {
                  const daysUntil = Math.ceil((new Date(ev.date).getTime() - Date.now()) / 86400000);
                  return (
                    <div key={ev.id} style={{ background: i === 0 ? "#111" : "#0a0a0a", padding: "2rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center" }}>
                      <div>
                        {i === 0 && <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.15em", color: "#AAFF00", background: "rgba(170,255,0,0.1)", padding: "3px 10px", marginBottom: "0.75rem", display: "inline-block", border: "1px solid rgba(170,255,0,0.3)" }}>NEXT STOP</span>}
                        <p style={{ fontFamily: "Bangers,cursive", fontSize: "2rem", color: "white", letterSpacing: "0.05em", lineHeight: 1, marginBottom: "0.5rem" }}>{sm[ev.schoolId] ?? "TBA"}</p>
                        <p style={{ fontSize: "1rem", color: "#AAFF00", fontWeight: 700, marginBottom: "0.25rem" }}>{ev.date} · {ev.time}</p>
                        {ev.venue && <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>{ev.venue}</p>}
                      </div>
                      {daysUntil <= 30 && (
                        <div>
                          <CountdownWidget targetDate={ev.date} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#FF0080", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>Past Shows</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
                {completed.map(ev => (
                  <div key={ev.id} style={{ background: "#080808", padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <p style={{ fontFamily: "Bangers,cursive", fontSize: "1.5rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>{sm[ev.schoolId] ?? "School"}</p>
                      <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.3)" }}>{ev.date}{ev.venue ? ` · ${ev.venue}` : ""}</p>
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                      <span>🏆 {ev.awards.length} awards</span>
                      <span>🎤 {ev.artists.length} artists</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "4rem 0" }}>Events coming soon. Stay tuned.</p>
          )}
        </div>
      </div>
    </div>
  );
}

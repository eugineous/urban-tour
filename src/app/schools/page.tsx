import { readJson } from "@/lib/db";
import type { School } from "@/lib/types";
import PublicNav from "@/components/PublicNav";

export default function SchoolsPage() {
  const schools = readJson<School>("schools.json");
  const completed = schools.filter(s => s.status === "Completed");
  const active = schools.filter(s => s.status !== "Completed");

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PublicNav />
      <div style={{ paddingTop: "70px" }}>
        {/* Page header */}
        <div style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "4rem 2rem 3rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#AAFF00", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>The Circuit</p>
            <h1 style={{ fontFamily: "Bangers,cursive", fontSize: "clamp(3rem,8vw,6rem)", color: "white", letterSpacing: "0.05em", lineHeight: 1 }}>OUR SCHOOLS</h1>
            <div style={{ width: "60px", height: "3px", background: "#AAFF00", margin: "1rem 0 1rem" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem" }}>High schools we&apos;ve partnered with across Kenya</p>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}>
          {/* Active schools */}
          {active.length > 0 && (
            <div style={{ marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#00BFFF", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>In The Pipeline</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
                {active.map(school => (
                  <div key={school.id} style={{ background: "#0a0a0a", padding: "2rem", borderLeft: "3px solid #00BFFF" }}>
                    <p style={{ fontFamily: "Bangers,cursive", fontSize: "1.5rem", color: "white", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{school.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>{school.county} County</p>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em", padding: "3px 10px", background: "rgba(0,191,255,0.1)", color: "#00BFFF", border: "1px solid rgba(0,191,255,0.3)" }}>
                      {school.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed schools */}
          {completed.length > 0 && (
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#FF0080", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>We&apos;ve Been Here</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
                {completed.map(school => (
                  <div key={school.id} style={{ background: "#0a0a0a", padding: "2rem", borderLeft: "3px solid #FF0080" }}>
                    <p style={{ fontFamily: "Bangers,cursive", fontSize: "1.5rem", color: "white", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{school.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>{school.county} County</p>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em", padding: "3px 10px", background: "rgba(255,0,128,0.1)", color: "#FF0080", border: "1px solid rgba(255,0,128,0.3)" }}>
                      COMPLETED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {schools.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "4rem 0" }}>Schools coming soon. Stay tuned.</p>
          )}
        </div>
      </div>
    </div>
  );
}

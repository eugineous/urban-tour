import { readJson } from "@/lib/db";
import type { Testimonial, School } from "@/lib/types";
import PublicNav from "@/components/PublicNav";

export default function TestimonialsPage() {
  const testimonials = readJson<Testimonial>("testimonials.json").filter(t => t.published);
  const schools = readJson<School>("schools.json");
  const sm = Object.fromEntries(schools.map(s => [s.id, s.name]));

  const principals = testimonials.filter(t => t.authorRole === "Principal");
  const teachers = testimonials.filter(t => t.authorRole === "Teacher");
  const students = testimonials.filter(t => t.authorRole === "Student");

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PublicNav />
      <div style={{ paddingTop: "70px" }}>
        <div style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "4rem 2rem 3rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#FF0080", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>The Word</p>
            <h1 style={{ fontFamily: "Bangers,cursive", fontSize: "clamp(3rem,8vw,6rem)", color: "white", letterSpacing: "0.05em", lineHeight: 1 }}>TESTIMONIALS</h1>
            <div style={{ width: "60px", height: "3px", background: "#FF0080", margin: "1rem 0 1rem" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem" }}>What principals, teachers and students say about Urban Tour</p>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}>
          {testimonials.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "4rem 0" }}>Testimonials coming soon.</p>
          )}

          {principals.length > 0 && (
            <div style={{ marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#AAFF00", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>👔 Principals</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
                {principals.map(t => <TestimonialCard key={t.id} t={t} school={sm[t.schoolId] ?? ""} />)}
              </div>
            </div>
          )}

          {teachers.length > 0 && (
            <div style={{ marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#00BFFF", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>📚 Teachers</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
                {teachers.map(t => <TestimonialCard key={t.id} t={t} school={sm[t.schoolId] ?? ""} />)}
              </div>
            </div>
          )}

          {students.length > 0 && (
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#FF0080", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>🎤 Students</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
                {students.map(t => <TestimonialCard key={t.id} t={t} school={sm[t.schoolId] ?? ""} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ t, school }: { t: Testimonial; school: string }) {
  return (
    <div style={{ background: "#0a0a0a", padding: "2rem" }}>
      <p style={{ fontSize: "2.5rem", color: "#FF0080", lineHeight: 1, marginBottom: "1rem", fontFamily: "Georgia,serif" }}>&ldquo;</p>
      <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "1.5rem", fontStyle: "italic" }}>{t.quote}</p>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
        <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "white" }}>{t.authorName}</p>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>{t.authorRole}{school ? ` · ${school}` : ""}</p>
      </div>
    </div>
  );
}

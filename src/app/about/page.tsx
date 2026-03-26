import PublicNav from "@/components/PublicNav";
import Link from "next/link";

export default function AboutPage() {
  const categories = ["Choir", "Gospel", "Poetry", "Drama", "Rap", "Dance", "Modeling"];
  const team = [
    { name: "Eugine Micah", role: "Host & Head of Digital Operations", note: "Former Citizen TV reporter. Author of 'Born Broke, Built Loud'. Nominated Male TikToker of the Year 2024." },
    { name: "Lucy Ogunde", role: "Co-Host, Urban News", note: "Dynamic youth presenter with a strong Gen Z connection." },
  ];

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PublicNav />
      <div style={{ paddingTop: "70px" }}>
        {/* Header */}
        <div style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "4rem 2rem 3rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#00BFFF", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>The Story</p>
            <h1 style={{ fontFamily: "Bangers,cursive", fontSize: "clamp(3rem,8vw,6rem)", color: "white", letterSpacing: "0.05em", lineHeight: 1 }}>ABOUT URBAN TOUR</h1>
            <div style={{ width: "60px", height: "3px", background: "#00BFFF", margin: "1rem 0" }} />
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}>
          {/* Mission */}
          <div style={{ marginBottom: "5rem", maxWidth: "700px" }}>
            <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Urban Tour is a professional television production by <strong style={{ color: "white" }}>Urban News on PPP TV Kenya</strong>. We visit one high school at a time where students compete in talent categories.
            </p>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              The best performances are broadcast to over 400,000 daily viewers nationwide — at zero cost to the school. We bring the full production: camera crew, DJ, sound system, and our hosting team.
            </p>
          </div>

          {/* Talent categories */}
          <div style={{ marginBottom: "5rem" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#AAFF00", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>Talent Categories</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
              {categories.map(cat => (
                <div key={cat} style={{ background: "#0a0a0a", padding: "1.5rem", textAlign: "center" }}>
                  <p style={{ fontFamily: "Bangers,cursive", fontSize: "1.25rem", color: "#AAFF00", letterSpacing: "0.05em" }}>{cat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hosts */}
          <div style={{ marginBottom: "5rem" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#FF0080", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>Your Hosts</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
              {team.map(member => (
                <div key={member.name} style={{ background: "#0a0a0a", padding: "2rem", borderLeft: "3px solid #FF0080" }}>
                  <p style={{ fontFamily: "Bangers,cursive", fontSize: "1.75rem", color: "white", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{member.name}</p>
                  <p style={{ fontSize: "0.8rem", color: "#FF0080", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.75rem" }}>{member.role}</p>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{member.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What schools get */}
          <div style={{ marginBottom: "5rem" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#00BFFF", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem" }}>What Schools Get</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
              {[
                ["📺", "National TV Exposure", "Featured on PPP TV reaching 400,000+ daily viewers"],
                ["🎥", "Professional Media", "Full camera crew, DJ, and high-end sound system"],
                ["🏆", "Student Prizes", "Certificates and gift hampers for winners"],
                ["🖼️", "Principal Recognition", "Framed Certificate of Recognition on camera"],
                ["📱", "Social Media", "Featured across Urban News platforms"],
                ["💰", "Zero Cost", "Everything provided at no cost to the school"],
              ].map(([icon, title, desc]) => (
                <div key={title as string} style={{ background: "#0a0a0a", padding: "1.75rem" }}>
                  <p style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{icon}</p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "white", marginBottom: "0.375rem" }}>{title}</p>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: "#AAFF00", padding: "3rem 2rem", textAlign: "center" }}>
            <h2 style={{ fontFamily: "Bangers,cursive", fontSize: "2.5rem", color: "#000", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>BRING URBAN TOUR TO YOUR SCHOOL</h2>
            <p style={{ color: "rgba(0,0,0,0.6)", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>Zero cost. National TV exposure. Professional production.</p>
            <a href="mailto:euginemicah@gmail.com" style={{ fontFamily: "Bangers,cursive", fontSize: "1.25rem", letterSpacing: "0.1em", padding: "0.875rem 3rem", background: "#000", color: "#AAFF00", textDecoration: "none", display: "inline-block" }}>
              GET IN TOUCH
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

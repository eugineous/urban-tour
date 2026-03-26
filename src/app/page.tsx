import { readJson } from "@/lib/db";
import type { Event, School, Testimonial } from "@/lib/types";
import Link from "next/link";
export default function PublicPage() {
  const events = readJson<Event>("events.json");
  const schools = readJson<School>("schools.json");
  const testimonials = readJson<Testimonial>("testimonials.json");
  const completed = events.filter(e=>e.status==="Completed").sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime());
  const upcoming = events.filter(e=>e.status==="Upcoming").sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
  const published = testimonials.filter(t=>t.published);
  const sm = Object.fromEntries(schools.map(s=>[s.id,s.name]));
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0A0A0A 0%,#1a0a2e 50%,#0A0A0A 100%)"}}>
      <header style={{textAlign:"center",padding:"5rem 1rem"}}>
        <h1 className="font-graffiti neon-lime" style={{fontSize:"6rem",textShadow:"0 0 40px #AAFF00",lineHeight:1}}>URBAN</h1>
        <h1 className="font-graffiti" style={{fontSize:"6rem",color:"white",lineHeight:1}}>TOUR</h1>
        <p style={{color:"#d1d5db",marginTop:"1rem"}}>High School Talent Search Â· Urban News on PPP TV Kenya</p>
        <p style={{color:"#6b7280",fontSize:"0.875rem"}}>400,000+ Daily Viewers</p>
        <div style={{marginTop:"2rem"}}>
          <Link href="/login" className="btn-lime font-graffiti" style={{fontSize:"1.25rem",padding:"0.75rem 2rem",textDecoration:"none",display:"inline-block"}}>ADMIN LOGIN</Link>
        </div>
      </header>
      <main style={{maxWidth:"1024px",margin:"0 auto",padding:"0 1rem 5rem",display:"flex",flexDirection:"column",gap:"4rem"}}>
        {upcoming.length>0&&(
          <section>
            <h2 className="font-graffiti neon-electric" style={{fontSize:"2.5rem",marginBottom:"1.5rem"}}>COMING SOON</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"}}>
              {upcoming.map(ev=>(
                <div key={ev.id} className="card" style={{border:"1px solid rgba(0,191,255,0.2)"}}>
                  <p className="font-graffiti" style={{fontSize:"1.25rem",color:"white"}}>{sm[ev.schoolId]||"TBA"}</p>
                  <p style={{fontSize:"0.875rem",color:"#00BFFF",marginTop:"0.25rem"}}>{ev.date} Â· {ev.time}</p>
                  {ev.venue&&<p style={{fontSize:"0.75rem",color:"#9ca3af",marginTop:"0.25rem"}}>{ev.venue}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
        {completed.length>0&&(
          <section>
            <h2 className="font-graffiti neon-lime" style={{fontSize:"2.5rem",marginBottom:"1.5rem"}}>WE HAVE BEEN TO</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"}}>
              {completed.map(ev=>(
                <div key={ev.id} className="card" style={{border:"1px solid rgba(170,255,0,0.1)"}}>
                  <p className="font-graffiti" style={{fontSize:"1.25rem",color:"white"}}>{sm[ev.schoolId]||"School"}</p>
                  <p style={{fontSize:"0.875rem",color:"#AAFF00",marginTop:"0.25rem"}}>{ev.date}</p>
                  {ev.highlightSummary&&<p style={{fontSize:"0.75rem",color:"#9ca3af",marginTop:"0.5rem"}}>{ev.highlightSummary}</p>}
                  <div style={{display:"flex",gap:"1rem",marginTop:"0.75rem",fontSize:"0.75rem",color:"#6b7280"}}>
                    <span>{ev.awards.length} awards</span>
                    <span>{ev.crew.length} crew</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {published.length>0&&(
          <section>
            <h2 className="font-graffiti neon-pink" style={{fontSize:"2.5rem",marginBottom:"1.5rem"}}>WHAT THEY SAY</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"}}>
              {published.map(t=>(
                <div key={t.id} className="card" style={{border:"1px solid rgba(255,0,128,0.15)"}}>
                  <p style={{fontSize:"0.875rem",color:"#d1d5db",fontStyle:"italic",marginBottom:"0.75rem"}}>"{t.quote}"</p>
                  <p style={{fontSize:"0.75rem",fontWeight:600,color:"white"}}>{t.authorName}</p>
                  <p style={{fontSize:"0.75rem",color:"#6b7280"}}>{t.authorRole} Â· {sm[t.schoolId]||""}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <section className="card" style={{textAlign:"center",padding:"3rem",border:"1px solid rgba(170,255,0,0.1)"}}>
          <h2 className="font-graffiti neon-lime" style={{fontSize:"2rem",marginBottom:"1rem"}}>ABOUT URBAN TOUR</h2>
          <p style={{color:"#d1d5db",maxWidth:"600px",margin:"0 auto",fontSize:"0.875rem",lineHeight:1.7}}>Urban Tour is a professional television production by Urban News on PPP TV Kenya. We visit one high school at a time where students compete in Choir, Gospel, Poetry, Drama, Rap, Dance, and Modeling. The best performances are broadcast to over 400,000 daily viewers nationwide.</p>
          <div style={{display:"flex",justifyContent:"center",gap:"3rem",marginTop:"2rem"}}>
            {[["400K+","Daily Viewers"],["PPP TV","Kenya"],["0 Cost","To Schools"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <p className="font-graffiti neon-lime" style={{fontSize:"2rem"}}>{v}</p>
                <p style={{fontSize:"0.75rem",color:"#9ca3af",marginTop:"0.25rem"}}>{l}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer style={{textAlign:"center",padding:"2rem",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
        <p style={{fontSize:"0.75rem",color:"#6b7280"}}>Urban Tour Â· Urban News on PPP TV Kenya Â· Hosted by Eugine Micah and Lucy Ogunde</p>
      </footer>
    </div>
  );
}

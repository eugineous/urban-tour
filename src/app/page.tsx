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
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0A0A0A 0%,#1a0a2e 50%,#0A0A0A 100%)",fontFamily:"Inter,sans-serif",color:"white"}}>
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,10,10,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(170,255,0,0.1)",padding:"0 1.5rem",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"baseline",gap:"0.375rem"}}>
          <span style={{fontFamily:"Bangers,cursive",fontSize:"1.75rem",color:"#AAFF00",textShadow:"0 0 12px #AAFF00",letterSpacing:"0.05em"}}>URBAN</span>
          <span style={{fontFamily:"Bangers,cursive",fontSize:"1.75rem",color:"white",letterSpacing:"0.05em"}}>TOUR</span>
        </Link>
        <div style={{display:"flex",alignItems:"center",gap:"1.5rem"}}>
          <a href="#schools" style={{fontSize:"0.875rem",color:"#9ca3af",textDecoration:"none"}}>Schools</a>
          <a href="#itinerary" style={{fontSize:"0.875rem",color:"#9ca3af",textDecoration:"none"}}>Itinerary</a>
          <a href="#testimonials" style={{fontSize:"0.875rem",color:"#9ca3af",textDecoration:"none"}}>Testimonials</a>
          <Link href="/login" style={{fontSize:"0.8rem",fontWeight:700,padding:"0.375rem 1rem",borderRadius:"6px",background:"rgba(170,255,0,0.1)",border:"1px solid rgba(170,255,0,0.4)",color:"#AAFF00",textDecoration:"none",letterSpacing:"0.05em"}}>ADMIN</Link>
        </div>
      </nav>
      <header style={{textAlign:"center",padding:"6rem 1rem 4rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:0.04,backgroundImage:"repeating-linear-gradient(45deg,#AAFF00 0,#AAFF00 1px,transparent 0,transparent 50%)",backgroundSize:"20px 20px"}}/>
        <div style={{position:"relative",zIndex:10}}>
          <p style={{fontSize:"0.75rem",letterSpacing:"0.3em",color:"#6b7280",textTransform:"uppercase",marginBottom:"1rem"}}>Urban News on PPP TV Kenya</p>
          <h1 style={{fontFamily:"Bangers,cursive",fontSize:"clamp(5rem,15vw,10rem)",color:"#AAFF00",textShadow:"0 0 40px #AAFF00",lineHeight:0.9,margin:0}}>URBAN</h1>
          <h1 style={{fontFamily:"Bangers,cursive",fontSize:"clamp(5rem,15vw,10rem)",color:"white",lineHeight:0.9,margin:0}}>TOUR</h1>
          <p style={{fontSize:"1.25rem",color:"#d1d5db",marginTop:"1.5rem",fontWeight:500}}>Kenya&apos;s High School Talent Search</p>
          <p style={{fontSize:"0.875rem",color:"#6b7280",marginTop:"0.5rem"}}>400,000+ Daily Viewers · Broadcast on PPP TV</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"2.5rem",flexWrap:"wrap"}}>
            <a href="#itinerary" style={{fontFamily:"Bangers,cursive",fontSize:"1.25rem",letterSpacing:"0.05em",padding:"0.75rem 2.5rem",borderRadius:"8px",background:"#AAFF00",color:"#000",textDecoration:"none"}}>VIEW ITINERARY</a>
            <a href="#schools" style={{fontFamily:"Bangers,cursive",fontSize:"1.25rem",letterSpacing:"0.05em",padding:"0.75rem 2.5rem",borderRadius:"8px",background:"transparent",border:"2px solid rgba(255,255,255,0.2)",color:"white",textDecoration:"none"}}>OUR SCHOOLS</a>
          </div>
        </div>
      </header>
      <div style={{background:"rgba(170,255,0,0.05)",borderTop:"1px solid rgba(170,255,0,0.1)",borderBottom:"1px solid rgba(170,255,0,0.1)",padding:"1.5rem 1rem"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:"1rem"}}>
          {[["400K+","Daily Viewers"],["PPP TV","Kenya"],["0 Cost","To Schools"],[String(schools.length),"Schools Reached"],[String(completed.length),"Events Done"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <p style={{fontFamily:"Bangers,cursive",fontSize:"2rem",color:"#AAFF00",lineHeight:1}}>{v}</p>
              <p style={{fontSize:"0.75rem",color:"#9ca3af",marginTop:"0.25rem"}}>{l}</p>
            </div>
          ))}
        </div>
      </div>
      <main style={{maxWidth:"1100px",margin:"0 auto",padding:"0 1rem 5rem"}}>
        <section id="itinerary" style={{paddingTop:"5rem"}}>
          <h2 style={{fontFamily:"Bangers,cursive",fontSize:"2.5rem",color:"#00BFFF",marginBottom:"0.5rem",letterSpacing:"0.05em"}}>ITINERARY</h2>
          <p style={{color:"#9ca3af",fontSize:"0.875rem",marginBottom:"2rem"}}>Where we&apos;re headed next</p>
          {upcoming.length===0&&completed.length===0&&<p style={{color:"#6b7280"}}>Events coming soon. Stay tuned!</p>}
          {upcoming.length>0&&(
            <div style={{marginBottom:"2rem"}}>
              <p style={{fontSize:"0.75rem",color:"#AAFF00",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"1rem"}}>Upcoming</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"}}>
                {upcoming.map(ev=>(
                  <div key={ev.id} style={{background:"rgba(0,191,255,0.05)",border:"1px solid rgba(0,191,255,0.25)",borderRadius:"12px",padding:"1.25rem"}}>
                    <p style={{fontFamily:"Bangers,cursive",fontSize:"1.25rem",color:"white",letterSpacing:"0.05em",marginBottom:"0.5rem"}}>{sm[ev.schoolId]??"TBA"}</p>
                    <p style={{fontSize:"0.875rem",color:"#00BFFF",fontWeight:600}}>{ev.date} · {ev.time}</p>
                    {ev.venue&&<p style={{fontSize:"0.75rem",color:"#9ca3af",marginTop:"0.25rem"}}>{ev.venue}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {completed.length>0&&(
            <div>
              <p style={{fontSize:"0.75rem",color:"#FF0080",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"1rem"}}>Completed</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"}}>
                {completed.map(ev=>(
                  <div key={ev.id} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px",padding:"1.25rem"}}>
                    <p style={{fontFamily:"Bangers,cursive",fontSize:"1.25rem",color:"white",letterSpacing:"0.05em",marginBottom:"0.5rem"}}>{sm[ev.schoolId]??"School"}</p>
                    <p style={{fontSize:"0.875rem",color:"#AAFF00"}}>{ev.date}</p>
                    {ev.highlightSummary&&<p style={{fontSize:"0.75rem",color:"#9ca3af",marginTop:"0.5rem"}}>{ev.highlightSummary}</p>}
                    <div style={{display:"flex",gap:"1rem",marginTop:"0.75rem",fontSize:"0.75rem",color:"#6b7280"}}>
                      <span>🏆 {ev.awards.length} awards</span>
                      <span>🎤 {ev.artists.length} artists</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <section id="schools" style={{paddingTop:"5rem"}}>
          <h2 style={{fontFamily:"Bangers,cursive",fontSize:"2.5rem",color:"#AAFF00",marginBottom:"0.5rem",letterSpacing:"0.05em"}}>OUR SCHOOLS</h2>
          <p style={{color:"#9ca3af",fontSize:"0.875rem",marginBottom:"2rem"}}>High schools we&apos;ve partnered with across Kenya</p>
          {schools.length===0?<p style={{color:"#6b7280"}}>Schools coming soon.</p>:(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"1rem"}}>
              {schools.map(school=>(
                <div key={school.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(170,255,0,0.1)",borderRadius:"12px",padding:"1.25rem"}}>
                  <p style={{fontFamily:"Bangers,cursive",fontSize:"1.25rem",color:"white",letterSpacing:"0.05em"}}>{school.name}</p>
                  <p style={{fontSize:"0.75rem",color:"#9ca3af",marginTop:"0.25rem"}}>{school.county}</p>
                  <span style={{display:"inline-block",marginTop:"0.75rem",fontSize:"0.7rem",padding:"2px 8px",borderRadius:"9999px",background:school.status==="Completed"?"rgba(255,0,128,0.1)":"rgba(0,191,255,0.1)",color:school.status==="Completed"?"#FF0080":"#00BFFF",border:`1px solid ${school.status==="Completed"?"rgba(255,0,128,0.3)":"rgba(0,191,255,0.3)"}`}}>{school.status}</span>
                </div>
              ))}
            </div>
          )}
        </section>
        {published.length>0&&(
          <section id="testimonials" style={{paddingTop:"5rem"}}>
            <h2 style={{fontFamily:"Bangers,cursive",fontSize:"2.5rem",color:"#FF0080",marginBottom:"0.5rem",letterSpacing:"0.05em"}}>WHAT THEY SAY</h2>
            <p style={{color:"#9ca3af",fontSize:"0.875rem",marginBottom:"2rem"}}>Principals, teachers and students speak</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1rem"}}>
              {published.map(t=>(
                <div key={t.id} style={{background:"rgba(255,0,128,0.04)",border:"1px solid rgba(255,0,128,0.15)",borderRadius:"12px",padding:"1.5rem"}}>
                  <p style={{fontSize:"0.875rem",color:"#e5e7eb",fontStyle:"italic",lineHeight:1.7,marginBottom:"1rem"}}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                    <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"rgba(255,0,128,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem"}}>{t.authorRole==="Principal"?"👔":t.authorRole==="Teacher"?"📚":"🎤"}</div>
                    <div>
                      <p style={{fontSize:"0.875rem",fontWeight:600,color:"white"}}>{t.authorName}</p>
                      <p style={{fontSize:"0.75rem",color:"#9ca3af"}}>{t.authorRole} · {sm[t.schoolId]??""}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        <section style={{paddingTop:"5rem"}}>
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(170,255,0,0.1)",borderRadius:"16px",padding:"3rem",textAlign:"center"}}>
            <h2 style={{fontFamily:"Bangers,cursive",fontSize:"2.5rem",color:"#AAFF00",marginBottom:"1rem",letterSpacing:"0.05em"}}>ABOUT URBAN TOUR</h2>
            <p style={{color:"#d1d5db",maxWidth:"650px",margin:"0 auto",fontSize:"0.9375rem",lineHeight:1.8}}>Urban Tour is a professional television production by Urban News on PPP TV Kenya. We visit one high school at a time where students compete in Choir, Gospel, Poetry, Drama, Rap, Dance, and Modeling. The best performances are broadcast to over 400,000 daily viewers nationwide — at zero cost to the school.</p>
          </div>
        </section>
      </main>
      <footer style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"2rem 1rem",textAlign:"center"}}>
        <p style={{fontFamily:"Bangers,cursive",fontSize:"1.25rem",color:"#AAFF00",letterSpacing:"0.05em",marginBottom:"0.5rem"}}>URBAN TOUR</p>
        <p style={{fontSize:"0.75rem",color:"#6b7280"}}>Urban News on PPP TV Kenya · Hosted by Eugine Micah &amp; Lucy Ogunde</p>
        <p style={{fontSize:"0.75rem",color:"#4b5563",marginTop:"0.5rem"}}><Link href="/login" style={{color:"#4b5563",textDecoration:"none"}}>Admin Access</Link></p>
      </footer>
    </div>
  );
}

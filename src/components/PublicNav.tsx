"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "HOME" },
  { href: "/schools", label: "SCHOOLS" },
  { href: "/itinerary", label: "ITINERARY" },
  { href: "/testimonials", label: "TESTIMONIALS" },
  { href: "/about", label: "ABOUT" },
];

export default function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(170,255,0,0.15)",
      height: "70px", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 2rem",
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontFamily: "Bangers,cursive", fontSize: "2rem", color: "#AAFF00", textShadow: "0 0 15px #AAFF00", letterSpacing: "0.05em", lineHeight: 1 }}>URBAN</span>
        <span style={{ fontFamily: "Bangers,cursive", fontSize: "2rem", color: "white", letterSpacing: "0.05em", lineHeight: 1 }}>TOUR</span>
      </Link>

      {/* Desktop nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} style={{
            fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em",
            color: pathname === href ? "#AAFF00" : "rgba(255,255,255,0.7)",
            textDecoration: "none", transition: "color 0.15s",
            borderBottom: pathname === href ? "2px solid #AAFF00" : "2px solid transparent",
            paddingBottom: "2px",
          }}>{label}</Link>
        ))}
        <Link href="/login" style={{
          fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em",
          padding: "0.5rem 1.25rem", borderRadius: "4px",
          background: "#AAFF00", color: "#000", textDecoration: "none",
        }}>ADMIN</Link>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer" }} className="mobile-menu-btn">
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", top: "70px", left: 0, right: 0,
          background: "#000", borderBottom: "1px solid rgba(170,255,0,0.2)",
          padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em",
              color: pathname === href ? "#AAFF00" : "white", textDecoration: "none",
            }}>{label}</Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} style={{
            fontSize: "0.875rem", fontWeight: 800, padding: "0.75rem 1.5rem",
            background: "#AAFF00", color: "#000", textDecoration: "none",
            borderRadius: "4px", textAlign: "center",
          }}>ADMIN LOGIN</Link>
        </div>
      )}
    </nav>
  );
}

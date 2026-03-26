"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { School, Calendar, Sparkles, MessageSquare, Users, LayoutDashboard, UserCheck, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/schools", label: "Schools", icon: School },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/ai-tools", label: "AI Tools", icon: Sparkles },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/admins", label: "Admins", icon: UserCheck },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col z-50"
      style={{ background: "rgba(10,10,10,0.97)", borderRight: "1px solid rgba(170,255,0,0.15)" }}>
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/admin">
          <div className="flex items-baseline gap-2">
            <span className="font-graffiti text-3xl neon-lime" style={{ textShadow: "0 0 12px #AAFF00" }}>URBAN</span>
            <span className="font-graffiti text-3xl text-white">TOUR</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Urban News · PPP TV Kenya</p>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-lime/10 text-lime border border-lime/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Public site link + logout */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-all">
          🌐 View Public Site
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

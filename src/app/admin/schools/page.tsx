"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { School, OutreachStatus } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";
import { Plus, Search } from "lucide-react";

const STATUSES: OutreachStatus[] = ["Pitched", "Confirmed", "Scheduled", "Completed"];

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<OutreachStatus | "All">("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", county: "", principalName: "", deputyPrincipalName: "", email: "", phone: "", notes: "", status: "Pitched" as OutreachStatus });

  async function load() {
    const res = await fetch("/api/schools");
    setSchools(await res.json());
  }

  useEffect(() => { load(); }, []);

  const filtered = schools.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.county.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || s.status === filter;
    return matchSearch && matchFilter;
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/schools", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ name: "", county: "", principalName: "", deputyPrincipalName: "", email: "", phone: "", notes: "", status: "Pitched" });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this school?")) return;
    await fetch(`/api/schools/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-graffiti text-4xl neon-lime">SCHOOL PIPELINE</h1>
          <p className="text-gray-400 text-sm mt-1">{schools.length} schools in the system</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-lime flex items-center gap-2">
          <Plus size={16} /> Add School
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search schools..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
        </div>
        <div className="flex gap-2">
          {(["All", ...STATUSES] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${filter === s ? "border-lime/50 bg-lime/10 text-lime" : "border-white/10 text-gray-400 hover:border-white/30"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card" style={{ border: "1px solid rgba(170,255,0,0.2)" }}>
          <h2 className="font-graffiti text-xl neon-lime mb-4">ADD NEW SCHOOL</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-3">
            <input placeholder="School name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="County" value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} />
            <input placeholder="Principal name" value={form.principalName} onChange={(e) => setForm({ ...form, principalName: e.target.value })} />
            <input placeholder="Deputy principal name" value={form.deputyPrincipalName} onChange={(e) => setForm({ ...form, deputyPrincipalName: e.target.value })} />
            <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as OutreachStatus })}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <div />
            <textarea placeholder="Notes (who you met, what they need...)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="col-span-2 h-20" />
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="btn-lime">Save School</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* School list */}
      <div className="space-y-3">
        {filtered.length === 0 && <p className="text-gray-500 text-sm">No schools found.</p>}
        {filtered.map((school) => (
          <div key={school.id} className="card flex items-center justify-between hover:border-white/15 transition-all">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <Link href={`/admin/schools/${school.id}`} className="font-semibold hover:text-lime transition-colors">{school.name}</Link>
                <StatusBadge status={school.status} />
              </div>
              <p className="text-xs text-gray-500">{school.county} · {school.email} · {school.phone}</p>
              {school.notes && <p className="text-xs text-gray-600 mt-1 truncate">{school.notes}</p>}
            </div>
            <div className="flex gap-2 ml-4">
              <Link href={`/admin/schools/${school.id}`} className="btn-ghost text-xs">View</Link>
              <button onClick={() => handleDelete(school.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

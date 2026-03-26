"use client";
import { useEffect, useState } from "react";
import type { TeamMember } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", phone: "", email: "" });

  async function load() {
    const res = await fetch("/api/team");
    setTeam(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ name: "", role: "", phone: "", email: "" });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-graffiti text-4xl text-white">THE CREW 🎬</h1>
          <p className="text-gray-400 text-sm mt-1">Production team roster</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-lime flex items-center gap-2">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card grid grid-cols-2 gap-3" style={{ border: "1px solid rgba(170,255,0,0.2)" }}>
          <input placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Role *" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="col-span-2 flex gap-3">
            <button type="submit" className="btn-lime">Add to Crew</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 gap-3">
        {team.map((member) => (
          <div key={member.id} className="card flex items-start justify-between">
            <div>
              <p className="font-semibold text-sm">{member.name}</p>
              <p className="text-xs text-lime mt-0.5">{member.role}</p>
              {member.phone && <p className="text-xs text-gray-500 mt-1">{member.phone}</p>}
              {member.email && <p className="text-xs text-gray-500">{member.email}</p>}
            </div>
            <button onClick={() => handleDelete(member.id)} className="text-gray-600 hover:text-red-400 transition-colors ml-2">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

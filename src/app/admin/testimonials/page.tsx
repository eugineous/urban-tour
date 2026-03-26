"use client";
import { useEffect, useState } from "react";
import type { Testimonial, School, AuthorRole } from "@/lib/types";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";

const ROLES: AuthorRole[] = ["Principal", "Teacher", "Student"];

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ authorName: "", authorRole: "Student" as AuthorRole, schoolId: "", quote: "", published: false });

  async function load() {
    const [t, s] = await Promise.all([fetch("/api/testimonials").then((r) => r.json()), fetch("/api/schools").then((r) => r.json())]);
    setItems(t);
    setSchools(s);
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ authorName: "", authorRole: "Student", schoolId: "", quote: "", published: false });
    load();
  }

  async function togglePublish(item: Testimonial) {
    await fetch(`/api/testimonials/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !item.published }) });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    load();
  }

  const schoolMap = Object.fromEntries(schools.map((s) => [s.id, s.name]));

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-graffiti text-4xl text-yellow-400">TESTIMONIALS 💬</h1>
          <p className="text-gray-400 text-sm mt-1">{items.filter((t) => t.published).length} published · {items.length} total</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-lime flex items-center gap-2">
          <Plus size={16} /> Add
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card space-y-3" style={{ border: "1px solid rgba(255,215,0,0.2)" }}>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Author name *" value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} required />
            <select value={form.authorRole} onChange={(e) => setForm({ ...form, authorRole: e.target.value as AuthorRole })}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={form.schoolId} onChange={(e) => setForm({ ...form, schoolId: e.target.value })}>
              <option value="">Select school</option>
              {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-auto" />
              Publish immediately
            </label>
          </div>
          <textarea placeholder="Quote / testimonial text *" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} className="h-24" required />
          <div className="flex gap-3">
            <button type="submit" className="btn-lime">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-500 text-sm">No testimonials yet.</p>}
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-sm">{item.authorName}</p>
                <p className="text-xs text-gray-400">{item.authorRole} · {schoolMap[item.schoolId] ?? "—"}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => togglePublish(item)} className={`text-xs px-2 py-1 rounded border transition-all flex items-center gap-1 ${item.published ? "border-lime/30 text-lime bg-lime/5" : "border-white/10 text-gray-500 hover:border-white/30"}`}>
                  {item.published ? <><Eye size={10} /> Published</> : <><EyeOff size={10} /> Draft</>}
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-300 italic">&ldquo;{item.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}

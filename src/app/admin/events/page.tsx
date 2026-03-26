"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Event, School } from "@/lib/types";
import CountdownWidget from "@/components/CountdownWidget";
import { Plus } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ schoolId: "", date: "", time: "10:00", venue: "", highlightSummary: "" });

  async function load() {
    const [ev, sc] = await Promise.all([fetch("/api/events").then((r) => r.json()), fetch("/api/schools").then((r) => r.json())]);
    setEvents(ev);
    setSchools(sc);
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ schoolId: "", date: "", time: "10:00", venue: "", highlightSummary: "" });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    load();
  }

  const upcoming = events.filter((e) => e.status === "Upcoming");
  const completed = events.filter((e) => e.status === "Completed");
  const schoolMap = Object.fromEntries(schools.map((s) => [s.id, s.name]));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-graffiti text-4xl neon-electric">EVENTS & ITINERARY</h1>
          <p className="text-gray-400 text-sm mt-1">{upcoming.length} upcoming · {completed.length} completed</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-lime flex items-center gap-2">
          <Plus size={16} /> Schedule Event
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ border: "1px solid rgba(0,191,255,0.2)" }}>
          <h2 className="font-graffiti text-xl neon-electric mb-4">SCHEDULE NEW EVENT</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-3">
            <select value={form.schoolId} onChange={(e) => setForm({ ...form, schoolId: e.target.value })} required>
              <option value="">Select school *</option>
              {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            <input placeholder="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
            <textarea placeholder="Highlight summary (for public page)" value={form.highlightSummary} onChange={(e) => setForm({ ...form, highlightSummary: e.target.value })} className="col-span-2 h-16" />
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="btn-lime">Create Event</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming */}
      <div>
        <h2 className="font-graffiti text-2xl text-white mb-4">UPCOMING 🔥</h2>
        {upcoming.length === 0 && <p className="text-gray-500 text-sm">No upcoming events scheduled.</p>}
        <div className="space-y-3">
          {upcoming.map((event) => {
            const daysUntil = Math.ceil((new Date(event.date).getTime() - Date.now()) / 86400000);
            return (
              <div key={event.id} className="card" style={{ border: "1px solid rgba(0,191,255,0.15)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{schoolMap[event.schoolId] ?? "Unknown School"}</h3>
                    <p className="text-xs text-gray-400">{event.date} · {event.time} · {event.venue}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/events/${event.id}`} className="btn-ghost text-xs">Manage</Link>
                    <button onClick={() => handleDelete(event.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">Delete</button>
                  </div>
                </div>
                {daysUntil <= 30 && <CountdownWidget targetDate={event.date} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h2 className="font-graffiti text-2xl text-white mb-4">COMPLETED ✅</h2>
          <div className="space-y-2">
            {completed.map((event) => (
              <div key={event.id} className="card flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity">
                <div>
                  <p className="font-semibold text-sm">{schoolMap[event.schoolId] ?? "Unknown School"}</p>
                  <p className="text-xs text-gray-500">{event.date} · {event.venue}</p>
                </div>
                <Link href={`/admin/events/${event.id}`} className="btn-ghost text-xs">View</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

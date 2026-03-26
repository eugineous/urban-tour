"use client";
import { useEffect, useState } from "react";
import type { Admin } from "@/lib/types";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);

  async function load() {
    const res = await fetch("/api/admins");
    setAdmins(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    await fetch(`/api/admins/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }

  const pending = admins.filter((a) => a.status === "pending");
  const approved = admins.filter((a) => a.status === "approved");
  const rejected = admins.filter((a) => a.status === "rejected");

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-graffiti text-4xl neon-electric">ADMIN ACCESS 🔐</h1>
        <p className="text-gray-400 text-sm mt-1">Manage who can access the dashboard</p>
      </div>

      {pending.length > 0 && (
        <div>
          <h2 className="font-graffiti text-xl text-yellow-400 mb-3">PENDING APPROVAL ({pending.length})</h2>
          <div className="space-y-2">
            {pending.map((admin) => (
              <div key={admin.id} className="card flex items-center justify-between" style={{ border: "1px solid rgba(255,215,0,0.2)" }}>
                <div>
                  <p className="font-semibold text-sm">{admin.name}</p>
                  <p className="text-xs text-gray-400">{admin.email}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(admin.id, "approved")} className="btn-lime text-xs">Approve</button>
                  <button onClick={() => updateStatus(admin.id, "rejected")} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-graffiti text-xl neon-lime mb-3">APPROVED ({approved.length})</h2>
        <div className="space-y-2">
          {approved.map((admin) => (
            <div key={admin.id} className="card flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{admin.name} {admin.isSuperAdmin && <span className="text-xs text-lime ml-1">👑 Super Admin</span>}</p>
                <p className="text-xs text-gray-400">{admin.email}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-lime/10 text-lime border border-lime/20">Active</span>
            </div>
          ))}
        </div>
      </div>

      {rejected.length > 0 && (
        <div>
          <h2 className="font-graffiti text-xl text-red-400 mb-3">REJECTED ({rejected.length})</h2>
          <div className="space-y-2">
            {rejected.map((admin) => (
              <div key={admin.id} className="card flex items-center justify-between opacity-50">
                <div>
                  <p className="font-semibold text-sm">{admin.name}</p>
                  <p className="text-xs text-gray-400">{admin.email}</p>
                </div>
                <button onClick={() => updateStatus(admin.id, "approved")} className="btn-ghost text-xs">Re-approve</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

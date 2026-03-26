"use client";
import { useState } from "react";
import type { School } from "@/lib/types";
import { Sparkles, Copy, RefreshCw } from "lucide-react";

const DOC_TYPES = [
  { value: "consent_letter", label: "📄 Consent Letter" },
  { value: "outreach_email", label: "📧 Outreach Email" },
  { value: "pitch_document", label: "📋 Pitch Document" },
  { value: "partnership_email", label: "🤝 Partnership Email" },
];

const CONTACT_CONTEXTS = [
  "Cold outreach — school has not been contacted before.",
  "Follow-up — met with principal directly.",
  "Follow-up — met with deputy principal.",
  "Follow-up — met with teacher in charge of talents/entertainment.",
  "Follow-up — needs parental consent letters.",
];

interface Props {
  school?: School;
}

export default function AIDocPanel({ school }: Props) {
  const [docType, setDocType] = useState("outreach_email");
  const [contactContext, setContactContext] = useState(CONTACT_CONTEXTS[0]);
  const [partnerName, setPartnerName] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setError("");
    try {
      const context: Record<string, string> = {
        schoolName: school?.name ?? "",
        principalName: school?.principalName ?? "",
        notes: school?.notes ?? extraNotes,
        contactContext,
        partnerName,
      };
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType, context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOutput(data.text);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Generation failed");
    }
    setLoading(false);
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="card space-y-4" style={{ border: "1px solid rgba(255,0,128,0.2)" }}>
      {/* Doc type selector */}
      <div className="flex flex-wrap gap-2">
        {DOC_TYPES.map((d) => (
          <button key={d.value} onClick={() => setDocType(d.value)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${docType === d.value ? "border-pink/50 bg-pink/10 text-pink" : "border-white/10 text-gray-400 hover:border-white/30"}`}>
            {d.label}
          </button>
        ))}
      </div>

      {/* Context inputs */}
      {(docType === "outreach_email" || docType === "consent_letter") && (
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Contact Context</label>
          <select value={contactContext} onChange={(e) => setContactContext(e.target.value)}>
            {CONTACT_CONTEXTS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}

      {docType === "partnership_email" && (
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Partner / Sponsor Name</label>
          <input placeholder="e.g. Safaricom, Equity Bank..." value={partnerName} onChange={(e) => setPartnerName(e.target.value)} />
        </div>
      )}

      {!school && (
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Additional Notes</label>
          <textarea placeholder="Any extra context..." value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} className="h-16" />
        </div>
      )}

      {/* Generate button */}
      <button onClick={generate} disabled={loading} className="btn-pink flex items-center gap-2">
        <Sparkles size={16} />
        {loading ? "Generating..." : "Generate with AI"}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Output */}
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Generated Document</p>
            <div className="flex gap-2">
              <button onClick={copy} className="btn-ghost text-xs flex items-center gap-1">
                <Copy size={12} /> {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={generate} className="btn-ghost text-xs flex items-center gap-1">
                <RefreshCw size={12} /> Regenerate
              </button>
            </div>
          </div>
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            className="h-64 text-sm font-mono"
            style={{ resize: "vertical" }}
          />
        </div>
      )}
    </div>
  );
}

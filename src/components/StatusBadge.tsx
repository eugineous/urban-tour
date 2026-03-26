import type { OutreachStatus } from "@/lib/types";

export default function StatusBadge({ status }: { status: OutreachStatus }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium status-${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

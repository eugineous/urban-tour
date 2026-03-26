import AIDocPanel from "@/components/AIDocPanel";

export default function AIToolsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-graffiti text-4xl neon-pink">AI TOOLS 🤖</h1>
        <p className="text-gray-400 text-sm mt-1">Generate consent letters, outreach emails, pitch docs and more</p>
      </div>
      <AIDocPanel />
    </div>
  );
}

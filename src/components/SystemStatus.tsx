export default function SystemStatus() {
  const items = [
    { label: "Status", value: "Online" },
    { label: "Region", value: "TR" },
    { label: "Build", value: "Stable" },
    { label: "Stack", value: "Next.js" },
  ];

  return (
    <div className="border border-foreground/15 p-5 w-72 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-foreground/10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            System
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">v1.0</span>
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between font-mono text-xs"
          >
            <span className="text-muted-foreground tracking-widest text-[10px] uppercase">
              {item.label}
            </span>
            <span className="text-foreground font-medium">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-foreground/10">
        <pre className="font-mono text-[10px] text-muted-foreground leading-relaxed whitespace-pre-wrap">
{`build  ${new Date().toISOString().slice(0, 10)}
status  operational`}
        </pre>
      </div>
    </div>
  );
}

export default function SystemStatus() {
  const items = [
    { label: "CPU", value: "12%", color: "text-emerald-400" },
    { label: "MEM", value: "248MB", color: "text-cyan-400" },
    { label: "NET", value: "STABLE", color: "text-emerald-400" },
    { label: "REGION", value: "TR", color: "text-fuchsia-400" },
  ];

  return (
    <div className="glass p-5 w-72 hud-corner relative">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-400/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 pulse" />
          <span className="font-tech text-[10px] text-gray-400 tracking-widest">
            SYS.MONITOR
          </span>
        </div>
        <span className="font-tech text-[10px] text-gray-600">v1.0</span>
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between font-tech text-xs"
          >
            <span className="text-gray-500 tracking-widest text-[10px]">
              {item.label}
            </span>
            <span className={`${item.color} font-bold`}>{item.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-cyan-400/20">
        <pre className="font-tech text-[10px] text-cyan-400/70 leading-relaxed">
{`┌─ uptime ──── 99.9%
├─ build ───── ${new Date().toISOString().slice(0, 10)}
└─ status ──── OPERATIONAL`}
        </pre>
      </div>
    </div>
  );
}

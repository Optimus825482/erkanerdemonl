interface MetricsWidgetProps {
  label: string;
  value: number | string;
  color: "cyan" | "fuchsia" | "green" | "yellow";
  hint: string;
}

const colorMap: Record<MetricsWidgetProps["color"], { text: string; dot: string; bar: string }> = {
  cyan: {
    text: "text-cyan-400",
    dot: "bg-cyan-400",
    bar: "from-cyan-400/0 via-cyan-400 to-cyan-400/0",
  },
  fuchsia: {
    text: "text-fuchsia-400",
    dot: "bg-fuchsia-400",
    bar: "from-fuchsia-400/0 via-fuchsia-400 to-fuchsia-400/0",
  },
  green: {
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    bar: "from-emerald-400/0 via-emerald-400 to-emerald-400/0",
  },
  yellow: {
    text: "text-yellow-400",
    dot: "bg-yellow-400",
    bar: "from-yellow-400/0 via-yellow-400 to-yellow-400/0",
  },
};

export default function MetricsWidget({
  label,
  value,
  color,
  hint,
}: MetricsWidgetProps) {
  const c = colorMap[color];

  return (
    <div className="glass p-5 sm:p-6 card-hover hud-corner relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${c.dot} pulse`} />
          <span className="font-tech text-[10px] text-gray-500 tracking-widest">
            {label}
          </span>
        </div>
        <span className="font-tech text-[10px] text-gray-600">/</span>
      </div>
      <div className="font-orbitron text-3xl sm:text-4xl font-black text-white tracking-wider mb-1">
        <span className={c.text}>{value}</span>
      </div>
      <div className="font-tech text-xs text-gray-500 mb-3">{hint}</div>
      <div className={`h-px bg-gradient-to-r ${c.bar}`} />
    </div>
  );
}

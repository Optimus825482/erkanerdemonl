interface MetricsWidgetProps {
  label: string;
  value: number | string;
  hint: string;
}

export default function MetricsWidget({
  label,
  value,
  hint,
}: MetricsWidgetProps) {
  return (
    <div className="border border-foreground/15 p-5 sm:p-6 bg-background hover:border-foreground transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">/</span>
      </div>
      <div className="font-display text-3xl sm:text-4xl font-bold tracking-tighter mb-1">
        {value}
      </div>
      <div className="font-mono text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

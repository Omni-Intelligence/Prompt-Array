export function Logo({ size = "default", showSubtitle = true }) {
  const sizeClasses = {
    small: {
      mainText: "text-lg",
      subtitleText: "text-[10px]",
      spacing: "gap-0.5",
    },
    default: {
      mainText: "text-3xl",
      subtitleText: "text-[11px]",
      spacing: "gap-1",
    },
    large: {
      mainText: "text-4xl",
      subtitleText: "text-xs",
      spacing: "gap-1.5",
    },
  };

  const config = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`flex flex-col items-start ${config.spacing} group`}>
      {/* Main Brand Name - Two Tone (matching KnowCode style) */}
      <div className={`flex ${config.mainText} font-bold leading-none tracking-normal gap-1`}>
        {/* "Prompt" in Brand Blue */}
        <span className="text-brand-blue">Prompt</span>
        {/* "Array" with gradient from brand to secondary (purple to orange) */}
        <span className="text-brand-accent">Array</span>
      </div>

      {/* Subtitle - matching KnowCode "BY ENTERPRISE DNA" style */}
      {showSubtitle && (
        <div className={`${config.subtitleText} font-normal tracking-[0.2em] text-muted-foreground uppercase leading-none`}>
          BY ENTERPRISE DNA
        </div>
      )}
    </div>
  );
}

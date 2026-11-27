import type { FilterOption } from "../types/ui";

type FilterGroupProps<T extends string> = {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  direction?: "horizontal" | "vertical";
  className?: string;
};

/** Accessible, keyboard-native filter buttons for project/shop lists. */
export function FilterGroup<T extends string>({
  options,
  value,
  onChange,
  label,
  direction = "horizontal",
  className = "",
}: FilterGroupProps<T>) {
  return (
    <div
      className={`flex ${direction === "vertical" ? "flex-col items-stretch" : "flex-wrap items-center justify-center"} gap-3 ${className}`}
      role="group"
      aria-label={label}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={option.disabled}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full border px-5 py-2 font-label text-[11px] uppercase tracking-[0.1em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${direction === "vertical" ? "w-full text-left" : ""} ${
            value === option.value
              ? "border-primary bg-primary text-[#0d0d0d] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              : "border-white/20 bg-white/5 text-text-dim backdrop-blur-sm hover:border-primary/50 hover:bg-white hover:text-[#0d0d0d] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

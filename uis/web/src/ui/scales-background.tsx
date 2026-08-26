import Image from "next/image";

type ScalesBackgroundProps = {
  /** Opacity of the scales image (0-1). Default 0.3 for hero, 0.04 for subtle. */
  opacity?: number;
  /** Extra class names for the wrapper div. */
  className?: string;
};

/**
 * Full-viewport background with scales texture and a gradient overlay.
 * Reusable across pages to provide a consistent visual intro backdrop.
 */
export function ScalesBackground({ opacity = 0.3, className = "" }: ScalesBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Image
        alt=""
        src="/media/Background-Scales.png"
        fill
        className="object-cover"
        style={{ opacity }}
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
    </div>
  );
}
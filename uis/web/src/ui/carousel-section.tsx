"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CarouselSlide } from "../types/content";

type CarouselSectionProps = {
  /** Optional section title. Omit or pass empty string to hide it. */
  title?: string;
  slides: CarouselSlide[];
  /** Auto-play interval in milliseconds. Default 5000 (5s). Set to 0 to disable. */
  autoPlayInterval?: number;
};

/** Chevron-left icon */
function ChevronLeftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

/** Chevron-right icon */
function ChevronRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/** Pause icon */
function PauseIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

/**
 * Carrusel de imágenes con auto-play, flechas manuales y navegación por dots.
 * Transición slide de derecha a izquierda. Se pausa al hacer hover/focus.
 */
export function CarouselSection({
  title,
  slides,
  autoPlayInterval = 5000,
}: CarouselSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex((index + totalSlides) % totalSlides);
    },
    [totalSlides],
  );

  const nextSlide = useCallback(
    () => goToSlide(currentIndex + 1),
    [currentIndex, goToSlide],
  );
  const prevSlide = useCallback(
    () => goToSlide(currentIndex - 1),
    [currentIndex, goToSlide],
  );

  // Auto-play timer
  useEffect(() => {
    if (autoPlayInterval <= 0 || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(nextSlide, autoPlayInterval);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlayInterval, isPaused, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
    },
    [prevSlide, nextSlide],
  );

  if (totalSlides === 0) return null;

  return (
    <section
      className="py-8 md:py-12 px-4 md:px-12 bg-background"
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Optional section title */}
        {title && (
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-display text-2xl md:text-4xl text-white mb-3">
              {title}
            </h2>
            <div className="mx-auto h-px w-16 bg-primary/60" />
          </div>
        )}

        {/* Carousel track */}
        <div
          className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-surface"
          role="region"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="relative w-full flex-shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`${slide.label} — ${idx + 1} of ${totalSlides}`}
              >
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                  {slide.src ? (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 90vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: slide.placeholderGradient }}
                    >
                      <span className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white/90 italic tracking-tight drop-shadow-lg">
                        {slide.label}
                      </span>
                    </div>
                  )}
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                  {/* Caption badge */}
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 z-10">
                    <span className="inline-block px-3 py-1.5 text-xs uppercase tracking-widest font-label bg-background/70 backdrop-blur-sm text-primary rounded-sm border border-white/10">
                      {slide.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Previous arrow */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm border border-white/10 text-white hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </button>

          {/* Next arrow */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm border border-white/10 text-white hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </button>

          {/* Dots navigation */}
          <div
            className="absolute bottom-4 right-4 md:bottom-6 md:right-8 z-20 flex items-center gap-2"
            role="tablist"
            aria-label="Slide navigation"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary ${
                  index === currentIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Pause indicator */}
          {isPaused && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur-sm px-3 py-1.5 text-xs text-text-dim font-label border border-white/10">
              <PauseIcon /> <span>Paused</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
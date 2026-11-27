"use client";

import { useEffect, useCallback } from "react";
import type { ProjectItem } from "../types/content";
import { AnimeIcon, GameIcon, FilmIcon } from "../icons";
import { CloseIcon } from "../icons";

type ProjectGalleryModalProps = {
  projects: ProjectItem[];
  currentIndex: number;
  locale?: string;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

function CategoryIcon({ category }: { category: ProjectItem["category"] }) {
  const iconClass = "w-4 h-4";
  switch (category) {
    case "anime":
      return <AnimeIcon className={iconClass} />;
    case "games":
      return <GameIcon className={iconClass} />;
    case "movies":
      return <FilmIcon className={iconClass} />;
    default:
      return <FilmIcon className={iconClass} />;
  }
}

function CategoryLabel({ category, locale }: { category: ProjectItem["category"]; locale?: string }) {
  const isEs = locale === "es";
  switch (category) {
    case "anime":
      return isEs ? "Anime" : "Anime";
    case "games":
      return isEs ? "Videojuegos" : "Games";
    case "movies":
      return isEs ? "Película" : "Movie";
    default:
      return category;
  }
}

export function ProjectGalleryModal({
  projects,
  currentIndex,
  locale,
  onClose,
  onNavigate,
}: ProjectGalleryModalProps) {
  const current = projects[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasPrev) {
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && hasNext) {
        onNavigate(currentIndex + 1);
      }
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!current) return null;

  const isEs = locale === "es";
  const prevLabel = isEs ? "Proyecto anterior" : "Previous project";
  const nextLabel = isEs ? "Proyecto siguiente" : "Next project";
  const closeLabel = isEs ? "Cerrar" : "Close";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.title} — ${current.category}`}
      aria-describedby="modal-caption-text"
    >
      {/* Prevent clicks inside from closing */}
      <div
        className="relative flex flex-col items-center w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-10 text-white/80 hover:text-primary transition-colors duration-300"
          aria-label={closeLabel}
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* Image area with nav arrows */}
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
          {/* Gradient placeholder (future real image) */}
          <div
            className="w-full h-full"
            style={{ background: current.image.gradient }}
            role="img"
            aria-label={isEs ? `Imagen ampliada de ${current.title}` : `Enlarged view of ${current.title}`}
          />

          {/* Left arrow */}
          {hasPrev && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-white hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-lg"
              aria-label={prevLabel}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Right arrow */}
          {hasNext && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-white hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-lg"
              aria-label={nextLabel}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Position indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
            <span className="font-label text-[10px] uppercase tracking-[0.1em] text-white/60" aria-live="polite">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>
        </div>

        {/* Caption footer */}
        <div className="w-full max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 text-primary">
              <CategoryIcon category={current.category} />
              <span className="font-label text-[10px] uppercase tracking-[0.1em] text-primary">
                <CategoryLabel category={current.category} locale={locale} />
              </span>
            </span>
          </div>
          <h3 className="font-display text-lg md:text-xl text-white mb-1">
            {current.title}
          </h3>
          <p id="modal-caption-text" className="font-body text-sm text-text-dim/70 leading-relaxed max-w-xl mx-auto">
            {current.description}
          </p>
        </div>
      </div>
    </div>
  );
}
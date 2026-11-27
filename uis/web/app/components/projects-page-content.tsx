"use client";

import { useState, useCallback } from "react";
import { PageIntro } from "@shared/ui/page-intro";
import { ProjectCard } from "@shared/ui/project-card";
import { ProjectGalleryModal } from "@shared/ui/project-gallery-modal";
import { FilterGroup } from "@shared/ui/filter-group";
import { splitGoldTag } from "@shared/utils/split-gold-tag";
import type { ProjectsDictionary } from "@shared/types/content";

type ProjectsPageContentProps = {
  dict: ProjectsDictionary;
  locale?: string;
};

const INITIAL_VISIBLE = 3;

type FilterType = "all" | "anime" | "games" | "movies";

export function ProjectsPageContent({ dict, locale }: ProjectsPageContentProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [allLoaded, setAllLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const filteredProjects =
    activeFilter === "all"
      ? dict.projects
      : dict.projects.filter((p) => p.category === activeFilter);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleFilter = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_VISIBLE);
    setAllLoaded(false);
  }, []);

  const handleZoom = useCallback((index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleModalNavigate = useCallback((nextIndex: number) => {
    setModalIndex(nextIndex);
  }, []);

  const handleLoadMore = useCallback(() => {
    const newCount = visibleCount + INITIAL_VISIBLE;
    if (newCount >= filteredProjects.length) {
      setVisibleCount(filteredProjects.length);
      setAllLoaded(true);
    } else {
      setVisibleCount(newCount);
    }
  }, [visibleCount, filteredProjects.length]);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: dict.filterAll },
    { key: "anime", label: dict.filterAnime },
    { key: "games", label: dict.filterGames },
  ];

  return (
    <main id="top">
      {/* ── Hero Section (same aesthetic as Services) ── */}
      <PageIntro
        content={{
          tag: dict.heroTag,
          title: dict.heroTitle,
          body: dict.heroBody,
          ctaSecondary: dict.heroCtaSecondary,
          ctaPrimary: dict.heroCtaPrimary,
        }}
        showCta={false}
        compact
      />

      {/* ── Gallery Section ── */}
      <section className="py-4 md:py-8 px-4 md:px-8 bg-background" aria-labelledby="gallery-title">
        <div className="max-w-7xl mx-auto">
          {/* Gallery title */}
          <h2 id="gallery-title" className="font-display text-xl md:text-3xl text-white text-center mb-6 md:mb-8">
            {splitGoldTag(dict.galleryTitle)}
          </h2>

          {/* Filter buttons */}
          <FilterGroup
            options={filters.map(({ key, label }) => ({ value: key, label }))}
            value={activeFilter}
            onChange={handleFilter}
            label={`${dict.filterAll} — ${dict.filterAnime} — ${dict.filterGames}`}
            className="mb-8 md:mb-10"
          />

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {visibleProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} locale={locale} index={idx} onZoom={handleZoom} />
            ))}
          </div>

          {/* Empty state */}
          {visibleProjects.length === 0 && (
            <p className="text-center font-body text-sm text-text-dim/50 mt-10">
              {activeFilter === "anime"
                ? dict.filterAnime
                : activeFilter === "games"
                  ? dict.filterGames
                  : "No projects"}{" "}
              &mdash; coming soon.
            </p>
          )}

          {/* Load More / No more projects */}
          <div className="flex flex-col items-center justify-center mt-10 md:mt-12 gap-4" role="status" aria-live="polite" aria-atomic="true">
            {allLoaded && (
              <p className="font-body text-sm text-text-dim/50 italic">
                {dict.noMoreProjects}
              </p>
            )}
            {hasMore && (
              <button
                onClick={handleLoadMore}
                aria-label={dict.loadMore}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 font-label text-xs uppercase tracking-widest transition-all duration-300 bg-primary text-[#0d0d0d] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:bg-white hover:text-[#0d0d0d] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
              >
                {dict.loadMore}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {modalOpen && (
        <ProjectGalleryModal
          projects={filteredProjects}
          currentIndex={modalIndex}
          locale={locale}
          onClose={handleModalClose}
          onNavigate={handleModalNavigate}
        />
      )}
    </main>
  );
}
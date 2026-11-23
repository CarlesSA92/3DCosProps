import type { ProjectItem } from "../types/content";
import { AnimeIcon, GameIcon, FilmIcon, MagnifyingGlassIcon } from "../icons";

type ProjectCardProps = {
  project: ProjectItem;
  locale?: string;
  onZoom?: (index: number) => void;
  index?: number;
};

function CategoryIcon({ category }: { category: ProjectItem["category"] }) {
  const iconClass = "w-5 h-5";
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

export function ProjectCard({ project, locale, onZoom, index }: ProjectCardProps) {
  const isEs = locale === "es";
  const itemSlug = project.id;
  const itemUrl = `/${locale ?? "en"}/projects/${itemSlug}`;

  return (
    <article
      className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
      itemScope
      itemType="https://schema.org/CreativeWork"
      aria-label={project.title}
    >
      {/* Image area with gradient placeholder */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ background: project.image.gradient }}
        itemProp="image"
        role="img"
        aria-label={isEs ? `Render de ${project.title}` : `Render of ${project.title}`}
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Magnifying glass zoom button — center on hover */}
        <button
          onClick={() => onZoom?.(index ?? 0)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
          aria-label={isEs ? `Ampliar ${project.title}` : `View ${project.title} details`}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 text-primary flex items-center justify-center border border-white/20 rounded-full bg-black/70 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white group-hover:text-[#0d0d0d] group-hover:border-white group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <MagnifyingGlassIcon className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </button>

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-primary">
          <CategoryIcon category={project.category} />
          <span className="font-label text-[10px] uppercase tracking-[0.1em] text-primary">
            <CategoryLabel category={project.category} locale={locale} />
          </span>
        </div>
      </div>

      {/* Caption area */}
      <div className="p-4 md:p-5">
        <meta itemProp="url" content={itemUrl} />
        <h3 className="font-display text-sm md:text-base text-white mb-1 group-hover:text-primary transition-colors duration-300" itemProp="name">
          {project.title}
        </h3>
        <p className="font-body text-xs md:text-sm text-text-dim/70 leading-relaxed line-clamp-2" itemProp="description">
          {project.description}
        </p>
        <meta itemProp="keywords" content={project.category} />
      </div>
    </article>
  );
}
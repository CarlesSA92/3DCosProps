import type { LegalDocument } from "../../app/content/legal-content";

type LegalPageProps = {
  document: LegalDocument;
};

/**
 * Shared component to render any legal document page.
 * Renders: title, last-updated, disclaimer notice, and all sections.
 */
export function LegalPage({ document }: LegalPageProps) {
  return (
    <main className="min-h-screen py-24 px-6 md:px-8 max-w-4xl mx-auto">
      {/* Disclaimer banner — visible only for mockup/draft documents */}
      {document.disclaimer && (
        <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded text-yellow-300 text-sm font-body">
          {document.disclaimer}
        </div>
      )}

      {/* Title */}
      <h1 className="font-display text-4xl md:text-5xl text-primary uppercase italic mb-4">
        {document.title}
      </h1>

      {/* Last updated */}
      <p className="font-body text-sm text-text-dim mb-12">
        Última actualización: {document.lastUpdated}
      </p>

      {/* Sections */}
      <div className="space-y-10">
        {document.sections.map((section, index) => (
          <section key={index}>
            <h2 className="font-label text-lg text-primary uppercase tracking-wider mb-4">
              {section.title}
            </h2>
            <div className="font-body text-text-dim leading-relaxed space-y-3">
              {Array.isArray(section.body)
                ? section.body.map((paragraph, pIndex) => {
                    // Detect table rows (markdown-style)
                    if (paragraph.startsWith("| ")) {
                      return (
                        <p key={pIndex} className="font-mono text-xs md:text-sm whitespace-pre-wrap">
                          {paragraph}
                        </p>
                      );
                    }
                    // Detect separator lines
                    if (paragraph === "---") {
                      return <hr key={pIndex} className="border-white/10 my-4" />;
                    }
                    // Detect section sub-headers (e.g. "3.1. Title" or "Impresión física")
                    const isSubHeader =
                      /^\d+\.\d+\./.test(paragraph) ||
                      (paragraph.startsWith("[") && paragraph.endsWith("]")) ||
                      (paragraph.length > 0 &&
                        !paragraph.startsWith("-") &&
                        paragraph === paragraph.toUpperCase() &&
                        paragraph.length > 3);
                    if (isSubHeader) {
                      return (
                        <p key={pIndex} className="text-primary font-semibold pt-2">
                          {paragraph}
                        </p>
                      );
                    }
                    return (
                      <p key={pIndex}>{paragraph || "\u00A0"}</p>
                    );
                  })
                : section.body}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
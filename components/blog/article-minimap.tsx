"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
} from "framer-motion";

interface Section {
  id: string;
  title: string;
  level: number; // 2 or 3
  wordCount: number;
}

interface ArticleMinimapProps {
  content: string;
  /** Total height in px for the minimap (default 320) */
  height?: number;
  /** Width in px for the minimap (default 48) */
  width?: number;
}

/**
 * Parse headings (h2/h3) from markdown or HTML content.
 * Returns sections with title and approximate word count between headings.
 */
function parseSections(content: string): Section[] {
  const sections: Section[] = [];

  // Try markdown headings first: ## Title or ### Title
  const mdRegex = /^(#{2,3})\s+(.+)$/gm;
  let mdMatch: RegExpExecArray | null;
  const mdHeadings: { index: number; level: number; title: string }[] = [];

  while ((mdMatch = mdRegex.exec(content)) !== null) {
    mdHeadings.push({
      index: mdMatch.index,
      level: mdMatch[1].length,
      title: mdMatch[2].trim(),
    });
  }

  // Try HTML headings if no markdown found
  if (mdHeadings.length === 0) {
    const htmlRegex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi;
    let htmlMatch: RegExpExecArray | null;

    while ((htmlMatch = htmlRegex.exec(content)) !== null) {
      mdHeadings.push({
        index: htmlMatch.index,
        level: parseInt(htmlMatch[1]),
        title: htmlMatch[2].replace(/<[^>]+>/g, "").trim(),
      });
    }
  }

  for (let i = 0; i < mdHeadings.length; i++) {
    const heading = mdHeadings[i];
    const nextIndex =
      i + 1 < mdHeadings.length ? mdHeadings[i + 1].index : content.length;
    const sectionText = content.slice(heading.index, nextIndex);
    // Strip markdown/HTML tags and count words
    const plainText = sectionText
      .replace(/<[^>]+>/g, "")
      .replace(/[#*_`~\[\]()]/g, "")
      .trim();
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;

    // Generate a slug id for scroll targeting
    const id = heading.title
      .toLowerCase()
      .replace(/[^a-z0-9一-鿿]+/g, "-")
      .replace(/(^-|-$)/g, "");

    sections.push({
      id: id || `section-${i}`,
      title: heading.title,
      level: heading.level,
      wordCount: Math.max(wordCount, 10), // minimum 10 words so bars aren't invisible
    });
  }

  return sections;
}

interface MinimapBarProps {
  section: Section;
  index: number;
  barHeight: number;
  topOffset: number;
  activeIndex: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  onClick: (id: string) => void;
}

function MinimapBar({
  section,
  index,
  barHeight,
  topOffset,
  activeIndex,
  hoveredIndex,
  onHover,
  onClick,
}: MinimapBarProps) {
  const isActive = index === activeIndex;
  const distance =
    hoveredIndex !== null ? Math.abs(index - hoveredIndex) : Infinity;

  // Distance-based scale: center gets 1.5x, neighbors proportional
  const scaleValue =
    hoveredIndex === null
      ? 1
      : distance === 0
        ? 1.5
        : distance === 1
          ? 1.25
          : distance === 2
            ? 1.1
            : 1;

  const springScale = useSpring(scaleValue, {
    stiffness: 300,
    damping: 25,
  });

  // Sync spring target
  useEffect(() => {
    springScale.set(scaleValue);
  }, [scaleValue, springScale]);

  const barColor = isActive
    ? "rgba(124,58,237,0.6)"
    : section.level === 3
      ? "rgba(255,255,255,0.05)"
      : "rgba(255,255,255,0.08)";

  return (
    <motion.div
      className="absolute right-0 cursor-pointer"
      style={{
        width: section.level === 3 ? 28 : 36,
        height: barHeight,
        top: topOffset,
        scale: springScale,
        transformOrigin: "right center",
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(section.id)}
      whileHover={{ x: -2 }}
    >
      <motion.div
        className="w-full h-full rounded-sm"
        animate={{
          backgroundColor: barColor,
          boxShadow: isActive
            ? "0 0 6px rgba(124,58,237,0.4)"
            : "0 0 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Hover label */}
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.div
            className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-[#0d0d1a]/90 backdrop-blur-md border border-white/10 rounded px-2 py-1 text-[10px] text-[#e8e8f0] shadow-lg">
              {section.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ArticleMinimap({
  content,
  height = 320,
  width = 48,
}: ArticleMinimapProps) {
  const sections = useMemo(() => parseSections(content), [content]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const totalWords = useMemo(
    () => sections.reduce((sum, s) => sum + s.wordCount, 0),
    [sections]
  );

  // Compute bar heights and top offsets, scaled to fit within `height`
  const { barHeights, barTops } = useMemo(() => {
    const rawHeights = sections.map((s) =>
      Math.max(6, (s.wordCount / totalWords) * height)
    );
    const rawTotal = rawHeights.reduce((a, b) => a + b, 0);

    // Scale down if cumulative height exceeds available space
    const scaleFactor = rawTotal > height ? height / rawTotal : 1;
    const scaledHeights = rawHeights.map((h) => h * scaleFactor);

    // Add a small gap between bars
    const gap = sections.length > 1 ? 2 : 0;
    const totalWithGaps =
      scaledHeights.reduce((a, b) => a + b, 0) + gap * (sections.length - 1);
    const finalScale =
      totalWithGaps > height ? height / totalWithGaps : 1;
    const finalHeights = scaledHeights.map((h) => h * finalScale);

    // Compute cumulative top offsets
    const tops: number[] = [];
    let cumY = 0;
    for (let i = 0; i < finalHeights.length; i++) {
      tops.push(cumY);
      cumY += finalHeights[i] + gap;
    }

    return { barHeights: finalHeights, barTops: tops };
  }, [sections, totalWords, height]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (sections.length === 0) return;

    const headingElements: HTMLElement[] = [];
    for (const section of sections) {
      const el =
        document.getElementById(section.id) ||
        document.querySelector(`[data-section-id="${section.id}"]`);
      if (el) headingElements.push(el as HTMLElement);
    }

    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = headingElements.indexOf(entry.target as HTMLElement);
            if (idx !== -1) {
              setActiveIndex(idx);
            }
          }
        }
      },
      {
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      }
    );

    for (const heading of headingElements) {
      observerRef.current.observe(heading);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    const el =
      document.getElementById(id) ||
      document.querySelector(`[data-section-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (sections.length === 0) return null;

  return (
    <motion.nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      style={{ width, height }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.5 }}
      aria-label="Article sections"
    >
      {sections.map((section, i) => (
        <MinimapBar
          key={section.id}
          section={section}
          index={i}
          barHeight={barHeights[i]}
          topOffset={barTops[i]}
          activeIndex={activeIndex}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
          onClick={scrollToSection}
        />
      ))}
    </motion.nav>
  );
}

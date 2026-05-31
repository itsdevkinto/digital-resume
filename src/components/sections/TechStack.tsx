import Section from "../Section";
import Reveal from "../Reveal";
import { ChevronRight } from "lucide-react";

const TechStack = () => {
  const techStack = {
    Frontend: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
    ],
    Backend: ["Node.js", "Python", "PHP", "Laravel", "PostgreSQL", "MongoDB"],
    "DevOps & Cloud": [
      "Cloudflare (Wrangler)",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],
  };

  return (
    <Section
      title="Tech Stack"
      action={
        <a
          href="#"
          className="text-sm font-medium text-foreground/65 hover:text-foreground inline-flex items-center gap-1"
        >
          View All <ChevronRight className="h-4 w-4" />
        </a>
      }
    >
      <div className="gap-4 space-y-2 sm:space-y-0 sm:grid grid-cols-2">
        {Object.entries(techStack).map(([cat, items], i) => (
          <Reveal delay={(i + 1) * 100} key={cat}>
            <div
              className="
                transition duration-300 ease-out hover:-translate-y-1
                hover:shadow-lg
                p-4 sm:p-5 group
                rounded-2xl border 
                border-black/25 dark:border-white/5"
            >
              <h3 className="text-xs font-semibold sm:text-sm mb-2 sm:mb-3 tracking-wide">
                {cat}
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {items.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border shadow-md text-foreground px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default TechStack;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Moon, Sun } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useDark } from "@/context/dark-context";

interface Project {
  name: string;
  description: string;
  year: string;
  liveUrl: string;
  ghUrl?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    name: "VAPOR",
    description:
      "A smart campus safety system that catches vaping on school premises by detecting vape emission. Uses IoT sensors with real-time alerting and dashboard analytics.",
    year: "2024",
    liveUrl: "#",
    ghUrl: "#",
    gradient: "from-blue-100/60 to-cyan-100/30",
  },
  {
    name: "OffGrid SOS",
    description:
      "Engineered a mesh-network routing protocol allowing distress messages to securely hop between devices, extending rescue range in areas with no cellular coverage.",
    year: "2024",
    liveUrl: "#",
    ghUrl: "#",
    gradient: "from-orange-100/60 to-red-100/30",
  },
  {
    name: "AIChat",
    description:
      "AI-powered chat assistant with context-aware responses, multi-turn conversation memory, and integration with popular LLM providers.",
    year: "2023",
    liveUrl: "#",
    ghUrl: "#",
    gradient: "from-purple-100/60 to-violet-100/30",
  },
  {
    name: "Tracker",
    description:
      "A workout and habit tracker with progress visualization, streak tracking, and customizable routines. Built with a focus on privacy-first local storage.",
    year: "2023",
    liveUrl: "#",
    ghUrl: "#",
    gradient: "from-emerald-100/60 to-green-100/30",
  },
];

const Projects = () => {
  const { dark, setDark } = useDark();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="text-foreground relative min-h-screen">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pt-8 pb-24 md:px-10">
        <div className="mb-6 flex items-center justify-between md:mb-10">
          <Link
            to="/"
            className="hover:text-foreground text-foreground/65 inline-flex items-center text-sm transition-colors sm:gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            Home
          </Link>
          <button
            onClick={() => setDark((d) => !d)}
            className="hover:bg-accent inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/25 transition-colors dark:border-white/5"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between gap-6">
            <h1
              className="text-3xl leading-tight font-bold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-anthropic-serif)" }}
            >
              Projects
            </h1>
            <a
              href="https://github.com/itsdevkinto"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background dark:bg-dark-surface text-foreground/65 hover:text-foreground flex shrink-0 items-center gap-2 rounded-xl border border-black/25 px-3.5 py-2.5 text-xs font-medium transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md dark:border-white/5"
            >
              <SiGithub className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub Profile</span>
            </a>
          </div>
          <p className="text-foreground/65 mt-2 text-sm">
            Side projects I've shipped — plus a few experiments along the way
          </p>
          <div className="text-foreground/50 mt-3 flex items-center gap-3 text-xs">
            <span>Andrei Lopez</span>
            <span className="bg-muted-foreground/40 h-1 w-1 rounded-full" />
            <span>{projects.length} projects</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.name}
              className="bg-background group cursor-pointer overflow-hidden rounded-2xl border border-black/25 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg dark:border-white/5 dark:bg-white/4"
              onClick={() => window.open(p.liveUrl, "_blank")}
            >
              <div className={`h-40 bg-linear-to-br sm:h-48 ${p.gradient}`} />
              <div className="p-4 sm:p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold sm:text-base">{p.name}</h3>
                  <span className="text-foreground/50 shrink-0 font-mono text-xs">
                    {p.year}
                  </span>
                </div>
                <p className="text-foreground/80 line-clamp-3 text-xs leading-snug sm:text-sm">
                  {p.description}
                </p>
                {p.ghUrl && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(p.ghUrl, "_blank");
                    }}
                    className="text-foreground/50 hover:text-foreground mt-3 inline-flex cursor-pointer items-center gap-1.5 text-xs transition-colors sm:mt-4"
                  >
                    <SiGithub className="h-3.5 w-3.5" />
                    Source
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Projects;

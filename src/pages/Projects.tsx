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
    <main className="min-h-screen text-foreground relative">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 md:px-10 pt-8 pb-24">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <Link
            to="/"
            className="inline-flex items-center sm:gap-1.5 text-sm hover:text-foreground text-foreground/65 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Home
          </Link>
          <button
            onClick={() => setDark((d) => !d)}
            className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-black/25 dark:border-white/5 hover:bg-accent transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-anthropic-serif)" }}
          >
            Projects
          </h1>
          <p className="text-sm text-foreground/65 mt-2">
            Side projects I've shipped — plus a few experiments along the way
          </p>
          <div className="flex items-center gap-3 text-xs text-foreground/50 mt-3">
            <span>Andrei Lopez</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>{projects.length} projects</span>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.name}
              className="bg-background dark:bg-white/4 border border-black/25 dark:border-white/5 rounded-2xl overflow-hidden transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg group cursor-pointer"
              onClick={() => window.open(p.liveUrl, "_blank")}
            >
              <div
                className={`h-40 sm:h-48 bg-gradient-to-br ${p.gradient}`}
              />
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-sm sm:text-base">{p.name}</h3>
                  <span className="text-xs font-mono text-foreground/50 shrink-0">
                    {p.year}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/80 leading-snug line-clamp-3">
                  {p.description}
                </p>
                {p.ghUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(p.ghUrl, "_blank");
                    }}
                    className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground transition-colors"
                  >
                    <SiGithub className="w-3.5 h-3.5" />
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

import { Link } from "react-router-dom";
import Section from "../Section";
import Reveal from "../Reveal";
import { ChevronRight, ArrowUpRight } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      name: "VAPOR",
      desc: "A smart campus safety system that catches vaping on school premises by detecting vape emission.",
      url: "projectone.dev",
    },
    {
      name: "OffGrid SOS",
      desc: "Engineered a mesh-network routing protocol allowing distress messages to securely hop between devices to extend rescue range.",
      url: "devtools.io",
    },
    { name: "AIChat", desc: "AI-powered chat assistant", url: "aichat.app" },
    { name: "Tracker", desc: "Workout & habit tracker", url: "tracker.app" },
  ];

  return (
    <Section
      title="Recent Projects"
      action={
        <Link
          to="/projects"
          className="text-foreground/65 hover:text-foreground inline-flex items-center gap-1 text-sm font-medium"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i + 1) * 100}>
            <a
              href="#"
              className="bg-background dark:bg-dark-surface group block rounded-2xl border border-black/25 p-4 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg sm:p-5 dark:border-white/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold sm:text-base">{p.name}</h3>
                  <p className="text-foreground/80 mt-1 truncate text-xs leading-snug font-medium sm:text-sm">
                    {p.desc}
                  </p>
                </div>
                <ArrowUpRight className="text-foreground/40 group-hover:text-foreground h-4 w-4 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <code className="bg-secondary text-foreground/75 mt-3 inline-block rounded px-2 py-1 font-mono text-xs sm:mt-4">
                {p.url}
              </code>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default ProjectsSection;

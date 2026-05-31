
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
        <a
          href="#"
          className="text-sm font-medium text-foreground/65 hover:text-foreground inline-flex items-center gap-1"
        >
          View All <ChevronRight className="h-4 w-4" />
        </a>
      }
    >
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i + 1) * 100}>
            <a
              href="#"
              className="block transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg group rounded-2xl border border-black/25 dark:border-white/5 p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base">{p.name}</h3>
                  <p className="text-xs sm:text-sm font-medium truncate text-foreground/80 mt-1 leading-snug">
                    {p.desc}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
              </div>
              <code className="mt-3 sm:mt-4 inline-block text-xs bg-secondary px-2 py-1 rounded font-mono text-foreground/75">
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

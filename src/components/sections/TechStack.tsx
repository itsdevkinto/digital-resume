import { useState, useEffect } from "react";
import Section from "../Section";
import Reveal from "../Reveal";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { MiniWebsiteModal } from "@/components/ui/mini-website-modal";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiVuedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiMongodb,
  SiCloudflare,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
} from "react-icons/si";
import { TbLayoutGrid, TbTerminal2, TbCloud, TbCode } from "react-icons/tb";

const techStackDetails = {
  Frontend: {
    icon: TbLayoutGrid,
    description:
      "Building responsive, accessible, and performant user interfaces.",
    skills: [
      { name: "React", level: 95, Icon: SiReact, color: "text-[#61DAFB]" },
      { name: "TypeScript", level: 85, Icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "JavaScript", level: 90, Icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "Next.js", level: 80, Icon: SiNextdotjs, color: "text-foreground" },
      { name: "Vue.js", level: 75, Icon: SiVuedotjs, color: "text-[#4FC08D]" },
      { name: "Tailwind CSS", level: 95, Icon: SiTailwindcss, color: "text-[#06B6D4]" },
    ],
  },
  Backend: {
    icon: TbTerminal2,
    description:
      "Designing scalable APIs, managing databases, and server logic.",
    skills: [
      { name: "Node.js", level: 85, Icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "PostgreSQL", level: 85, Icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "PHP", level: 80, Icon: SiPhp, color: "text-[#777BB4]" },
      { name: "MongoDB", level: 80, Icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Laravel", level: 75, Icon: SiLaravel, color: "text-[#FF2D20]" },
      { name: "Python", level: 70, Icon: SiPython, color: "text-[#3776AB]" },
    ],
  },
  "DevOps & Cloud": {
    icon: TbCloud,
    description:
      "Deploying infrastructure, setting up CI/CD, and scaling apps.",
    skills: [
      { name: "Cloudflare", level: 85, Icon: SiCloudflare, color: "text-[#F38020]" },
      { name: "GitHub Actions", level: 85, Icon: SiGithubactions, color: "text-[#2088FF]" },
      { name: "Docker", level: 80, Icon: SiDocker, color: "text-[#2496ED]" },
      { name: "Kubernetes", level: 60, Icon: SiKubernetes, color: "text-[#326CE5]" },
    ],
  },
};

type Category = keyof typeof techStackDetails;

const categoryConfig: Record<Category, { icon: React.ComponentType<{ className?: string }>; description: string; mobileLabel?: string }> = {
  Frontend: {
    icon: TbLayoutGrid,
    description: "Building responsive, accessible, and performant user interfaces.",
  },
  Backend: {
    icon: TbTerminal2,
    description: "Designing scalable APIs, managing databases, and server logic.",
  },
  "DevOps & Cloud": {
    icon: TbCloud,
    description: "Deploying infrastructure, setting up CI/CD, and scaling apps.",
    mobileLabel: "DevOps",
  },
};

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeCategory ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeCategory]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCategory(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Section
      title="Tech Stack"
      action={
        <button
          onClick={() => setActiveCategory("Frontend")}
          className="text-sm font-medium text-foreground/65 hover:text-foreground inline-flex items-center gap-1 cursor-pointer"
        >
          View All <ChevronRight className="h-4 w-4" />
        </button>
      }
    >
      <div className="gap-3 sm:gap-4 grid grid-rows-3">
        {(Object.keys(techStackDetails) as Category[]).map((cat, i) => {
          const skills = techStackDetails[cat].skills;
          return (
            <Reveal delay={(i + 1) * 100} key={cat}>
              <div
                onClick={() => setActiveCategory(cat)}
                className="transition duration-300 ease-out min-h-25 hover:-translate-y-1 hover:shadow-lg cursor-pointer p-4 sm:p-5 rounded-2xl border border-black/25 dark:border-white/5 bg-background dark:bg-dark-surface"
              >
                <h3 className="text-xs font-semibold sm:text-sm mb-2 sm:mb-3 tracking-wide">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {skills.map((s) => {
                    const Icon = s.Icon;
                    return (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-1 rounded-full border shadow-md text-foreground px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs"
                      >
                        <Icon className={`w-3 h-3 ${s.color} shrink-0`} />
                        {s.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <MiniWebsiteModal
        open={!!activeCategory}
        activeCategory={activeCategory ?? "Frontend"}
        categories={categoryConfig}
        headerLabel="Tech Stack"
        headerIcon={TbCode}
        onClose={() => setActiveCategory(null)}
        onSwitch={(cat) => setActiveCategory(cat as Category)}
        renderContent={(cat) => {
          const category = cat as Category;
          return (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pb-8 md:pb-0">
              {techStackDetails[category].skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.22,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-background border border-black/25 dark:border-white/5 rounded-xl px-2.5 py-3 sm:px-4 sm:py-3.5 flex flex-col gap-2 sm:gap-2.5"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium min-w-0">
                      <skill.Icon className={`w-3.5 h-3.5 ${skill.color} shrink-0`} />
                      <span className="truncate">{skill.name}</span>
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground font-mono tabular-nums shrink-0">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-0.75 w-full bg-secondary rounded-full overflow-hidden shrink-0">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: skill.level / 100 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + idx * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full bg-foreground/80 rounded-full origin-left"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          );
        }}
      />
    </Section>
  );
};

export default TechStack;
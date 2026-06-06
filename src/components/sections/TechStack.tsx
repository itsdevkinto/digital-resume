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
import type { IconType } from "react-icons/lib";

const techStackDetails: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    mobileLabel?: string;
    skills: { name: string; Icon: IconType; color: string }[];
  }
> = {
  Frontend: {
    icon: TbLayoutGrid,
    description:
      "Building responsive, accessible, and performant user interfaces.",
    skills: [
      { name: "React", Icon: SiReact, color: "text-[#61DAFB]" },
      { name: "TypeScript", Icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "JavaScript", Icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "Next.js", Icon: SiNextdotjs, color: "text-foreground" },
      { name: "Vue.js", Icon: SiVuedotjs, color: "text-[#4FC08D]" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "text-[#06B6D4]" },
    ],
  },
  Backend: {
    icon: TbTerminal2,
    description:
      "Designing scalable APIs, managing databases, and server logic.",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "PHP", Icon: SiPhp, color: "text-[#777BB4]" },
      { name: "MongoDB", Icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Laravel", Icon: SiLaravel, color: "text-[#FF2D20]" },
      { name: "Python", Icon: SiPython, color: "text-[#3776AB]" },
    ],
  },
  "DevOps & Cloud": {
    icon: TbCloud,
    description:
      "Deploying infrastructure, setting up CI/CD, and scaling apps.",
    mobileLabel: "DevOps",
    skills: [
      { name: "Cloudflare", Icon: SiCloudflare, color: "text-[#F38020]" },
      {
        name: "GitHub Actions",
        Icon: SiGithubactions,
        color: "text-[#2088FF]",
      },
      { name: "Docker", Icon: SiDocker, color: "text-[#2496ED]" },
      { name: "Kubernetes", Icon: SiKubernetes, color: "text-[#326CE5]" },
    ],
  },
};

type Category = keyof typeof techStackDetails;

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const catConfig = Object.fromEntries(
    Object.entries(techStackDetails).map(
      ([key, { icon, description, mobileLabel }]) => [
        key,
        { icon, description, ...(mobileLabel ? { mobileLabel } : {}) },
      ],
    ),
  ) as Record<
    Category,
    {
      icon: React.ComponentType<{ className?: string }>;
      description: string;
      mobileLabel?: string;
    }
  >;

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
          className="text-foreground/65 hover:text-foreground inline-flex cursor-pointer items-center gap-1 text-sm font-medium"
        >
          View All <ChevronRight className="h-4 w-4" />
        </button>
      }
    >
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {(Object.keys(techStackDetails) as Category[]).map((cat, i) => {
          const skills = techStackDetails[cat].skills;
          return (
            <Reveal delay={(i + 1) * 100} key={cat}>
              <div
                onClick={() => setActiveCategory(cat)}
                className="bg-background dark:bg-dark-surface min-h-25 cursor-pointer rounded-2xl border border-black/25 p-4 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg sm:p-5 dark:border-white/5"
              >
                <h3 className="mb-2 text-xs font-semibold tracking-wide sm:mb-3 sm:text-sm">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {skills.map((s) => {
                    const Icon = s.Icon;
                    return (
                      <span
                        key={s.name}
                        className="text-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs shadow-md sm:px-3 sm:py-1"
                      >
                        <Icon className={`h-3 w-3 ${s.color} shrink-0`} />
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
        categories={catConfig}
        headerLabel="Tech Stack"
        headerIcon={TbCode}
        onClose={() => setActiveCategory(null)}
        onSwitch={(cat) => setActiveCategory(cat as Category)}
        renderContent={(cat) => {
          const category = cat as Category;
          return (
            <div className="grid h-full grid-cols-2 auto-rows-1fr gap-2 pb-8 sm:gap-1 md:pb-0">
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
                  className="bg-background flex h-full flex-col gap-2 rounded-xl border border-black/25 px-2.5 py-3 sm:gap-2.5 sm:px-4 sm:py-3.5 md:p-5 dark:border-white/5"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="flex min-w-0 items-center gap-1.5 text-xs font-medium sm:gap-2 sm:text-sm">
                      <skill.Icon
                        className={`h-3.5 w-3.5 ${skill.color} shrink-0`}
                      />
                      <span className="truncate">{skill.name}</span>
                    </span>
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

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { motion } from "framer-motion";
import { MiniWebsiteModal } from "@/components/ui/mini-website-modal";
import { TbCloud, TbCode, TbServer, TbCertificate } from "react-icons/tb";

const certificationsDetails = {
  Cloud: {
    icon: TbCloud,
    description: "Cloud infrastructure and platform certifications.",
    items: [
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon",
        description:
          "Validated expertise in designing distributed systems on AWS using cost-optimization and best-practice architectural principles.",
      },
      {
        name: "Google Cloud Professional",
        issuer: "Google",
        description:
          "Demonstrated proficiency in designing, developing, and managing GCP solutions with scalable cloud architecture.",
      },
    ],
  },
  Engineering: {
    icon: TbCode,
    description: "Core software engineering and technical certifications.",
    items: [
      {
        name: "Software Engineering",
        issuer: "TestDome",
        description:
          "Certified in core software engineering concepts including data structures, algorithms, and system design best practices.",
      },
    ],
  },
  AI: {
    icon: TbServer,
    description: "Artificial intelligence and machine learning certifications.",
    items: [
      {
        name: "Generative AI Professional",
        issuer: "Oracle",
        description:
          "Specialized certification in generative AI models, prompt engineering, and AI application development using Oracle's AI platform.",
      },
    ],
  },
};

type Category = keyof typeof certificationsDetails;

const categoryConfig: Record<Category, { icon: React.ComponentType<{ className?: string }>; description: string }> = {
  Cloud: { icon: TbCloud, description: "Cloud infrastructure and platform certifications." },
  Engineering: { icon: TbCode, description: "Core software engineering and technical certifications." },
  AI: { icon: TbServer, description: "Artificial intelligence and machine learning certifications." },
};

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const certificationToCategory: Record<string, Category> = {
    "AWS Solutions Architect": "Cloud",
    "Google Cloud Professional": "Cloud",
    "Software Engineering": "Engineering",
    "Generative AI Professional": "AI",
  };

  const certifications = [
    { name: "AWS Solutions Architect", issuer: "Amazon" },
    { name: "Google Cloud Professional", issuer: "Google" },
    { name: "Software Engineering", issuer: "TestDome" },
    { name: "Generative AI Professional", issuer: "Oracle" },
  ];

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
    <Reveal
      delay={100}
      as="section"
      className="p-4 py-8 sm:py-10 border-t dark:border dark:rounded-lg border-black dark:border-white/5 dark:bg-dark-surface"
    >
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2
          className="text-xl sm:text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-anthropic-serif)" }}
        >
          Recent Certifications
        </h2>
        <button
          onClick={() => setActiveCategory("Cloud")}
          className="text-sm font-medium text-foreground/65 hover:text-foreground inline-flex items-center gap-1 cursor-pointer"
        >
          View All <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-2">
        {certifications.map((c, i) => {
          const category = certificationToCategory[c.name];
          return (
            <Reveal
              key={c.name}
              delay={(i + 1) * 80}
              className="rounded-md border border-black/25 dark:border-white/5 bg-background hover:bg-secondary-foreground/20 transition duration-300 ease-in-out p-3 sm:p-4"
            >
              <button
                onClick={() => setActiveCategory(category)}
                className="w-full text-left cursor-pointer"
              >
                <h3 className="font-bold text-xs sm:text-sm leading-snug text-foreground">
                  {c.name}
                </h3>
                <p className="text-xs font-medium text-foreground/75 mt-1">
                  {c.issuer}
                </p>
              </button>
            </Reveal>
          );
        })}
      </div>

      <MiniWebsiteModal
        open={!!activeCategory}
        activeCategory={activeCategory ?? "Cloud"}
        categories={categoryConfig}
        headerLabel="Certifications"
        headerIcon={TbCertificate}
        onClose={() => setActiveCategory(null)}
        onSwitch={(cat) => setActiveCategory(cat as Category)}
        renderContent={(cat) => {
          const category = cat as Category;
          return (
            <div className="flex flex-col gap-3 pb-8 md:pb-0">
              {certificationsDetails[category].items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.22,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-background hover:bg-secondary-foreground/20 transition duration-300 ease-in-out border border-black/25 dark:border-white/5 rounded-xl px-4 py-4 sm:px-5 sm:py-4 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-medium text-foreground text-sm sm:text-base leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-[10px] sm:text-xs font-mono text-muted-foreground px-2 py-0.5 rounded-md bg-secondary shrink-0">
                      {item.issuer}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          );
        }}
      />
    </Reveal>
  );
};

export default Certifications;
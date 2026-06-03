import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { motion } from "framer-motion";
import { MiniWebsiteModal } from "@/components/ui/mini-website-modal";
import { TbCloud, TbCode, TbServer, TbCertificate } from "react-icons/tb";
import type { IconType } from "react-icons/lib";
import { FaAws, FaCertificate } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GrOracle } from "react-icons/gr";

interface CertDetailItem {
  name: string;
  issuer: string;
  description: string;
  orgIcon?: IconType;
  orgColor?: string;
}

const certificationsDetails: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    items: CertDetailItem[];
  }
> = {
  Cloud: {
    icon: TbCloud,
    description: "Cloud infrastructure and platform certifications.",
    items: [
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon",
        orgIcon: FaAws,
        orgColor: "text-[#FF9900]",
        description:
          "Validated expertise in designing distributed systems on AWS using cost-optimization and best-practice architectural principles.",
      },
      {
        name: "Google Cloud Professional",
        issuer: "Google",
        orgIcon: FcGoogle,
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
        orgIcon: FaCertificate,
        orgColor: "text-emerald-500",
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
        orgIcon: GrOracle,
        orgColor: "text-[#F80000]",
        description:
          "Specialized certification in generative AI models, prompt engineering, and AI application development using Oracle's AI platform.",
      },
    ],
  },
};

type Category = keyof typeof certificationsDetails;

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const flatCerts = Object.entries(certificationsDetails).flatMap(
    ([category, { items }]) => items.map(({ description, ...item }) => ({
      ...item,
      category: category as Category,
    })),
  );

  const catConfig = Object.fromEntries(
    Object.entries(certificationsDetails).map(([key, { icon, description }]) => [
      key,
      { icon, description },
    ]),
  ) as Record<Category, { icon: React.ComponentType<{ className?: string }>; description: string }>;

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
      className="p-4 py-8 sm:py-10 border-t dark:border dark:rounded-lg border-black dark:border-white/5 dark:bg-white/4"
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
        {flatCerts.map((c, i) => {
          return (
            <Reveal
              key={c.name}
              delay={(i + 1) * 80}
              className="rounded-md border border-black/25 dark:border-white/5 bg-background dark:bg-dark-surface hover:bg-secondary-foreground/20 transition duration-300 ease-in-out p-3 sm:p-4"
            >
              <button
                onClick={() => setActiveCategory(c.category)}
                className="w-full text-left cursor-pointer"
              >
                <h3 className="font-bold text-xs sm:text-sm leading-snug text-foreground">
                  {c.name}
                </h3>
                <p className="text-xs font-medium text-foreground/75 mt-2 inline-flex items-center gap-1">
                  {c.orgIcon && (
                    <c.orgIcon
                      className={`size-4 shrink-0 ${c.orgColor ?? "text-foreground/30"}`}
                    />
                  )}
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
        categories={catConfig}
        headerLabel="Certifications"
        headerIcon={TbCertificate}
        onClose={() => setActiveCategory(null)}
        onSwitch={(cat) => setActiveCategory(cat as Category)}
        renderContent={(cat) => {
          const category = cat as Category;
          return (
            <div className="flex flex-col gap-2">
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
                  className="bg-background hover:bg-secondary-foreground/20 border border-black/25 dark:border-white/5 rounded-xl px-4 py-4 sm:px-5 sm:py-4 flex flex-col gap-2"
                >
                  <h4 className="font-medium text-foreground text-sm sm:text-base leading-tight">
                    {item.name}
                  </h4>
                  <span className="text-[10px] sm:text-xs font-mono text-muted-foreground px-2 py-0.5 rounded-md bg-secondary shrink-0 inline-flex w-fit items-center gap-1">
                    {" "}
                    {item.orgIcon && (
                      <item.orgIcon
                        className={`w-3.5 h-3.5 shrink-0 ${item.orgColor ?? "text-foreground/30"}`}
                      />
                    )}
                    {item.issuer}
                  </span>
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

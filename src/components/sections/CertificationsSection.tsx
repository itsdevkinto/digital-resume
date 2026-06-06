import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { motion } from "framer-motion";
import { MiniWebsiteModal } from "@/components/ui/mini-website-modal";
import { TbCloud, TbCode, TbServer, TbCertificate } from "react-icons/tb";
import type { IconType } from "react-icons/lib";
import { FaAws } from "react-icons/fa";
import { SiTata } from "react-icons/si";
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
        orgIcon: SiTata,
        orgColor: "text-[#4f84c4]",
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
    ([category, { items }]) =>
      items.map(({ ...item }) => ({
        ...item,
        category: category as Category,
      })),
  );

  const catConfig = Object.fromEntries(
    Object.entries(certificationsDetails).map(
      ([key, { icon, description }]) => [key, { icon, description }],
    ),
  ) as Record<
    Category,
    { icon: React.ComponentType<{ className?: string }>; description: string }
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
    <Reveal
      delay={100}
      as="section"
      className="border-t border-black p-4 py-8 sm:py-10 dark:rounded-lg dark:border dark:border-white/5 dark:bg-white/4"
    >
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h2
          className="text-xl font-bold tracking-tight sm:text-2xl"
          style={{ fontFamily: "var(--font-anthropic-serif)" }}
        >
          Recent Certifications
        </h2>
        <button
          onClick={() => setActiveCategory("Cloud")}
          className="text-foreground/65 hover:text-foreground inline-flex cursor-pointer items-center gap-1 text-sm font-medium"
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
              className="bg-background dark:bg-dark-surface hover:bg-secondary-foreground/20 rounded-md border border-black/25 p-3 transition duration-300 ease-in-out sm:p-4 dark:border-white/5"
            >
              <button
                onClick={() => setActiveCategory(c.category)}
                className="w-full cursor-pointer text-left"
              >
                <h3 className="text-foreground text-xs leading-snug font-bold sm:text-sm">
                  {c.name}
                </h3>
                <p className="text-foreground/75 mt-2 inline-flex items-center gap-1 text-xs font-medium">
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
                  className="bg-background hover:bg-secondary-foreground/20 flex flex-col gap-2 rounded-xl border border-black/25 px-4 py-4 sm:px-5 sm:py-4 dark:border-white/5"
                >
                  <h4 className="text-foreground text-sm leading-tight font-medium sm:text-base">
                    {item.name}
                  </h4>
                  <span className="text-muted-foreground bg-secondary inline-flex w-fit shrink-0 items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] sm:text-xs">
                    {" "}
                    {item.orgIcon && (
                      <item.orgIcon
                        className={`h-3.5 w-3.5 shrink-0 ${item.orgColor ?? "text-foreground/30"}`}
                      />
                    )}
                    {item.issuer}
                  </span>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed sm:text-sm">
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

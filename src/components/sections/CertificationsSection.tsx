import { ChevronRight } from "lucide-react";
import { Reveal } from "../Reveal";

const Certifications = () => {
  const certifications = [
    { name: "AWS Solutions Architect", issuer: "Amazon" },
    { name: "Google Cloud Professional", issuer: "Google" },
    { name: "Software Engineering", issuer: "TestDome" },
    { name: "Generative AI Professional", issuer: "Oracle" },
  ];

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
        <a
          href="#"
          className="text-sm font-medium text-foreground/65 hover:text-foreground inline-flex items-center gap-1"
        >
          View All <ChevronRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid gap-2">
        {certifications.map((c, i) => (
          <Reveal
            key={c.name}
            delay={(i + 1) * 80}
            className="rounded-md border border-black/25 dark:border-white/5 bg-background hover:bg-secondary-foreground/20 transition duration-300 ease-in-out p-3 sm:p-4"
          >
            <h3 className="font-bold text-xs sm:text-sm leading-snug text-foreground">
              {c.name} mobile
            </h3>
            <p className="text-xs font-medium text-foreground/75 mt-1">
              {c.issuer}
            </p>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
};

export default Certifications;


import Reveal from "../Reveal";
import Section from "../Section";

const experience = [
  {
    role: "BS Computer Science",
    company: "STI College",
    year: "2026",
    current: true,
  },
  {
    role: "Hello World! 👋",
    company: "Wrote my first line of code",
    year: "2024",
  },
];

const ExperienceSection = () => {
  return (
    <Section title="Experience">
      <ol className="relative border-l border-black/25 dark:border-white/5 ml-2">
        {experience.map((e, i) => (
          <Reveal
            as="li"
            delay={(i + 1) * 200}
            key={i}
            className="pl-5 sm:pl-6 pb-5 mr-4 sm:pb-6 last:pb-0 relative group"
          >
            <span
              className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-sm group-hover:bg-foreground ${
                e.current
                  ? "bg-foreground"
                  : "bg-background border border-black/25 dark:border-white/5"
              }`}
            />
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base leading-snug">
                  {e.role}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-foreground/75 mt-0.5">
                  {e.company}
                </p>
              </div>
              <span className="text-xs sm:text-sm font-medium text-foreground/75 tabular-nums shrink-0">
                {e.year}
              </span>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
};

export default ExperienceSection;

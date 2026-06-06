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
      <ol className="relative ml-2 border-l border-black/25 dark:border-white/5">
        {experience.map((e, i) => (
          <Reveal
            as="li"
            delay={(i + 1) * 200}
            key={i}
            className="group relative mr-4 pb-5 pl-5 last:pb-0 sm:pb-6 sm:pl-6"
          >
            <span
              className={`group-hover:bg-foreground absolute top-1.5 -left-1.25 h-2.5 w-2.5 rounded-sm ${
                e.current
                  ? "bg-foreground"
                  : "bg-background border border-black/25 dark:border-white/5"
              }`}
            />
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm leading-snug font-bold sm:text-base">
                  {e.role}
                </h3>
                <p className="text-foreground/75 mt-0.5 text-xs font-medium sm:text-sm">
                  {e.company}
                </p>
              </div>
              <span className="text-foreground/75 shrink-0 text-xs font-medium tabular-nums sm:text-sm">
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

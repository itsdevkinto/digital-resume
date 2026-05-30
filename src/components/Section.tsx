import Reveal from "./Reveal";

const Section = ({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => {

  return (
    <Reveal
      delay={100}
      as="section"
      className={`dark:bg-dark-surface p-4 py-8 sm:py-10 border-t dark:border dark:rounded-lg border-black dark:border-white/5 mt-4`}
    >
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2
          className="text-xl sm:text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-anthropic-serif)" }}
        >
          {title}
        </h2>
        {action}
      </div>
      {children}
    </Reveal>
  );
};

export default Section;
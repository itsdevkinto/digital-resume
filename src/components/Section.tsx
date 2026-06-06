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
      className="mt-4 border-t border-black p-4 py-8 sm:py-10 dark:rounded-lg dark:border dark:border-white/5 dark:bg-white/4"
    >
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h2
          className="text-xl font-bold tracking-tight sm:text-2xl"
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

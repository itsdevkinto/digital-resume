import { Reveal } from "../Reveal";
import AccessCard from "./AccessCard";

const AboutSection = () => {
  return (
    <Reveal
      delay={200}
      as="section"
      className="mt-8 md:mt-10 sm:mt-12 grid gap-4 md:grid-cols-[1fr_320px]"
    >
      <div className="dark:bg-white/4 rounded-lg p-4">
        <h2
          className="text-xl sm:text-2xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-anthropic-serif)" }}
        >
          About
        </h2>
        <div className="space-y-3 sm:space-y-4 text-sm text-foreground leading-relaxed">
          <p>
            I'm a full-stack software engineer specializing in building modern
            web applications with JavaScript, TypeScript, and Embedded C/C++
            (Arduino). I love crafting clean interfaces, scalable backends, and
            developer tools.
          </p>
          <p>
            I've build apps for growing teams ship fast, streamline their
            workflows, and grow technical communities around the products I work
            on.
          </p>
          <p>
            Lately I've been exploring AI tooling and integrating LLM-powered
            features into production applications.
          </p>
        </div>
      </div>

      {/* Access card — full width on mobile, natural aspect ratio preserved */}
      <AccessCard />
    </Reveal>
  );
};

export default AboutSection;

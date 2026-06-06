import { Reveal } from "../Reveal";
import AccessCard from "./AccessCard";

const AboutSection = () => {
  return (
    <Reveal
      delay={200}
      as="section"
      className="mt-8 grid gap-4 sm:mt-12 md:mt-10 md:grid-cols-[1fr_320px]"
    >
      <div className="rounded-lg p-4 dark:bg-white/4">
        <h2
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
          style={{ fontFamily: "var(--font-anthropic-serif)" }}
        >
          About
        </h2>
        <div className="text-foreground space-y-3 text-sm leading-relaxed sm:space-y-4">
          <p>
            I'm a full-stack software engineer specializing in building modern
            web applications with JavaScript, TypeScript, and Embedded C/C++
            (Arduino). I love crafting clean interfaces, scalable backends, and
            developer tools.
          </p>
          <p>
            I've built apps for growing teams and organizations, streamlined
            their workflows, and grown technical communities around the products
            I work on.
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

import { Mail, Calendar, BookOpen } from "lucide-react";
import Reveal from "../Reveal";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "yo.kinto.x@example.com",
    href: "mailto:yo.kinto@example.com",
  },
  {
    icon: Calendar,
    label: "Let's Talk",
    value: "Schedule a Call",
    href: "#",
  },
  {
    icon: BookOpen,
    label: "Blog",
    value: "Read my blog",
    href: "#",
  },
];

const GetInTouch = () => {

  return (
    <Reveal
      delay={100}
      as="section"
      className="p-4 py-8 dark:bg-white/4 sm:py-10 border-t dark:border dark:rounded-t-lg border-black dark:border-white/5 mt-4"
    >
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2
          className="text-xl sm:text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-anthropic-serif)" }}
        >
          Get In Touch
        </h2>
      </div>
      <div className="grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-3">
        {contactLinks.map(({ icon: Icon, label, value, href }, i) => (
          <Reveal key={label} delay={(i + 1) * 100}>
            <a
              href={href}
              target="_blank"
              className="rounded-2xl border bg-background dark:bg-dark-surface border-black/25 dark:border-white/5 p-4 sm:p-5 hover:bg-secondary-foreground/20 transition flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0"
            >
              <Icon className="h-4 w-4 text-foreground/50 sm:hidden" />
              <div>
                <p className="text-xs font-medium text-foreground/70">
                  {label}
                </p>
                <p className="font-semibold mt-0.5 sm:mt-1 text-sm sm:text-base">
                  {value}
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
};

export default GetInTouch;

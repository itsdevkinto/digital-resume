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
      className="mt-4 border-t border-black p-4 py-8 sm:py-10 dark:rounded-t-lg dark:border dark:border-white/5 dark:bg-white/4"
    >
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h2
          className="text-xl font-bold tracking-tight sm:text-2xl"
          style={{ fontFamily: "var(--font-anthropic-serif)" }}
        >
          Get In Touch
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {contactLinks.map(({ icon: Icon, label, value, href }, i) => (
          <Reveal key={label} delay={(i + 1) * 100}>
            <a
              href={href}
              target="_blank"
              className="bg-background dark:bg-dark-surface hover:bg-secondary-foreground/20 flex items-center gap-3 rounded-2xl border border-black/25 p-4 transition sm:flex-col sm:items-start sm:gap-0 sm:p-5 dark:border-white/5"
            >
              <Icon className="text-foreground/50 h-4 w-4 sm:hidden" />
              <div>
                <p className="text-foreground/70 text-xs font-medium">
                  {label}
                </p>
                <p className="mt-0.5 text-sm font-semibold sm:mt-1 sm:text-base">
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

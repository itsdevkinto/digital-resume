import Reveal from "../Reveal";
import {
  FiGithub as Github,
  FiLinkedin as Linkedin,
  FiInstagram as Instagram,
} from "react-icons/fi";

const Footer = () => {
  return (
    <Reveal
      delay={200}
      as="footer"
      className="glass flex flex-col items-start justify-between gap-4 border-t border-black p-4 py-8 sm:flex-row sm:items-center sm:py-10 dark:rounded-b-lg dark:border dark:border-t-0 dark:border-white/5 dark:bg-white/4"
    >
      <p className="text-foreground/70 text-xs font-medium sm:text-sm">
        © {new Date().getFullYear()} Andrei Lopez. All rights reserved.
      </p>
      <div className="flex gap-2">
        {[
          {
            Icon: Linkedin,
            href: "https://www.linkedin.com/in/zaki-andrei-lopez",
            label: "LinkedIn",
          },
          {
            Icon: Github,
            href: "https://github.com/itsdevkinto",
            label: "GitHub",
          },
          { Icon: Instagram, href: "#", label: "Instagram" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            aria-label={label}
            className="hover:bg-accent inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/25 transition dark:border-white/5"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </Reveal>
  );
};

export default Footer;

import Reveal from "../Reveal";
import { FiGithub as Github, FiLinkedin as Linkedin, FiInstagram as Instagram } from "react-icons/fi";

const Footer = () => {
  return (
    <Reveal
      delay={200}
      as="footer"
      className="glass p-4 py-8 sm:py-10 border-t dark:border dark:border-t-0 dark:rounded-b-lg border-black dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <p className="text-xs sm:text-sm font-medium text-foreground/70">
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/25 dark:border-white/5 hover:bg-accent transition"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </Reveal>
  );
};

export default Footer;

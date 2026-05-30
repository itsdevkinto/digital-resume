
import {
  BadgeCheck,
  MapPin,
  Moon,
  Sun,
  Trophy,
  ChevronRight,
  Calendar,
  Mail,
  BookOpen,
} from "lucide-react";
import { useDark } from "@/context/dark-context";
import profile from "@/assets/profile.jpg";
import { Reveal } from "../Reveal";

const ProfileSection = () => {
  const { dark, setDark } = useDark();

  return (
    <Reveal delay={100} className="flex items-stretch gap-4 md:gap-6">
      {/* Avatar — stretches to match content column height on mobile, fixed size on desktop */}
      <img
        src={profile}
        alt="Portrait"
        className="w-28 md:w-40 md:h-40 object-cover rounded-2xl shrink-0 self-stretch md:self-auto"
      />

      {/* All info beside avatar at every breakpoint */}
      <div className="flex-1 min-w-0">
        {/* Name row + dark mode toggle */}
        <div className="flex items-center justify-between gap-2">
          <h1
            className="flex items-center gap-1.5 text-lg md:text-2xl font-bold tracking-tight truncate"
            style={{ fontFamily: "var(--font-anthropic-serif)" }}
          >
            Andrei Lopez
            <BadgeCheck
              color="white"
              fill="#2a6df4"
              className="size-4 md:size-5 shrink-0"
            />
          </h1>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/25 dark:border-white/5 hover:bg-accent transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Location */}
        <p className="mt-0.5 flex items-center gap-1 text-xs md:text-sm font-medium text-foreground/70">
          <MapPin className="size-3 md:size-3.5 shrink-0" />
          <span className="truncate">Manila, Philippines</span>
        </p>

        {/* Tagline */}
        <p className="mt-1 md:mt-2 text-[10px] md:text-sm text-foreground [&>span]:text-foreground/30">
          Software Engineer<span className="mx-1">\</span>Full-Stack
          <span className="mx-1">\</span>Open Source
        </p>

        {/* Achievement badge */}
        <a
          href="#"
          className="mt-2 md:mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#2a6df4] text-white px-3 py-1.5 text-[10px] md:text-xs font-medium shadow-sm hover:opacity-90 transition w-fit max-w-full"
        >
          <Trophy className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
          <span className="truncate">
            <span className="md:hidden">Recent Achievement</span>
            <span className="hidden md:inline">
              Recent Achievement · View Details
            </span>
          </span>
          <ChevronRight className="h-3 w-3 shrink-0" />
        </a>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-2 mt-2 md:mt-3">
          <a
            href="#"
            className="inline-flex items-center gap-1 md:gap-1.5 rounded-lg bg-foreground text-background px-2.5 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-medium hover:opacity-90 transition whitespace-nowrap"
          >
            <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
            Schedule a Call
          </a>
          <a
            href="mailto:yo.kinto.x@example.com"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-black/25 dark:border-white/5 px-4 py-2 text-xs font-medium hover:bg-accent transition whitespace-nowrap"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            Send Email
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1 md:gap-1.5 rounded-lg border border-black/25 dark:border-white/5 px-2.5 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-medium hover:bg-accent transition whitespace-nowrap"
          >
            <BookOpen className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
            <span className="md:hidden">My blog</span>
            <span className="hidden md:inline">Read my blog</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
};

export default ProfileSection;

import { Link } from "react-router-dom";
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
        className="max-h-38 w-28 shrink-0 self-stretch rounded-2xl object-cover md:h-40 md:max-h-none md:w-40 md:self-auto"
      />

      {/* All info beside avatar at every breakpoint */}
      <div className="min-w-0 flex-1">
        {/* Name row + dark mode toggle */}
        <div className="flex items-center justify-between gap-2">
          <h1
            className="flex items-center gap-1.5 truncate text-lg font-bold tracking-tight md:text-2xl"
            style={{ fontFamily: "var(--font-anthropic-serif)" }}
          >
            Andrei Lopez
            <BadgeCheck
              color="white"
              fill="#2a6df4"
              className="size-4 shrink-0 md:size-5"
            />
          </h1>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            className="hover:bg-accent inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/25 transition-colors dark:border-white/5"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Location */}
        <p className="text-foreground/70 mt-0.5 flex items-center gap-1 text-xs font-medium md:text-sm">
          <MapPin className="size-3 shrink-0 md:size-3.5" />
          <span className="truncate">Manila, Philippines</span>
        </p>

        {/* Tagline */}
        <p className="text-foreground [&>span]:text-foreground/30 mt-1 text-[10px] md:mt-2 md:text-sm">
          Software Engineer<span className="mx-1">\</span>Full-Stack
          <span className="mx-1">\</span>Open Source
        </p>

        {/* Achievement badge */}
        <Link
          to="/achievements"
          className="mt-2 inline-flex w-fit max-w-full items-center gap-1.5 rounded-lg bg-[#2a6df4] px-3 py-1.5 text-[10px] font-medium text-white shadow-sm transition hover:opacity-90 md:mt-3 md:text-xs"
        >
          <Trophy className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
          <span className="truncate">
            <span className="md:hidden">Recent Achievement</span>
            <span className="hidden md:inline">
              Recent Achievement · View Details
            </span>
          </span>
          <ChevronRight className="h-3 w-3 shrink-0" />
        </Link>

        {/* CTA buttons */}
        <div className="mt-2 flex flex-wrap gap-2 md:mt-3">
          <a
            href="#"
            className="bg-foreground text-background inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-medium whitespace-nowrap transition hover:opacity-90 md:gap-1.5 md:px-4 md:py-2 md:text-xs"
          >
            <Calendar className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
            Schedule a Call
          </a>
          <a
            href="mailto:yo.kinto.x@example.com"
            className="hover:bg-accent hidden items-center gap-1.5 rounded-lg border border-black/25 px-4 py-2 text-xs font-medium whitespace-nowrap transition md:inline-flex dark:border-white/5"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            Send Email
          </a>
          <a
            href="#"
            className="hover:bg-accent inline-flex items-center gap-1 rounded-lg border border-black/25 px-2.5 py-1.5 text-[10px] font-medium whitespace-nowrap transition md:gap-1.5 md:px-4 md:py-2 md:text-xs dark:border-white/5"
          >
            <BookOpen className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
            <span className="md:hidden">My blog</span>
            <span className="hidden md:inline">Read my blog</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
};

export default ProfileSection;

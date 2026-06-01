import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { IconType } from "react-icons/lib";
import { AmbientBackground } from "@/components/ambient-background";
import { ChevronLeft } from "lucide-react";
import { TbTrophy, TbWriting, TbMicrophone2 } from "react-icons/tb";

interface Entry {
  title: string;
  date: string;
  description: string;
  body: string[];
}

interface Section {
  key: string;
  label: string;
  icon: IconType;
  items: Entry[];
}

const sections: Section[] = [
  {
    key: "awards",
    label: "Awards & Honors",
    icon: TbTrophy,
    items: [
      {
        title: "Developer of the Year",
        date: "2023",
        description:
          "Awarded for leading the migration to a microservices architecture, improving system uptime to 99.99%.",
        body: [
          "Our monolith had been running for nearly a decade. Every deployment was a gamble — a thirty-minute window where the entire team held their breath. The decision to break it apart wasn't driven by hype; it came down to a simple calculation: at our current rate of feature growth, the monolith would become unmanageable within eighteen months.",
          "We decomposed the system into fifteen bounded services over a six-month period, using an event-driven choreography pattern with Kafka as the backbone. The hardest part wasn't the technical split — it was maintaining team velocity while paying down years of accumulated architectural debt. We introduced strangler fig patterns, dual-writes during the transition, and feature flags that let us roll back individual services independently.",
          "By the end of the migration, deployment time dropped from thirty minutes to under two minutes. Rollbacks went from full-system reverts to a single command targeting one service. System uptime climbed from 99.92% to 99.99% — our longest outage in the past year was eleven seconds.",
        ],
      },
      {
        title: "Global Hackathon Winner",
        date: "2022",
        description:
          "1st place out of 500+ teams for building an AI-powered code review assistant.",
        body: [
          "Forty-eight hours, three people, one idea. The prompt was deceptively simple: build something that makes developers' lives better. We decided to tackle code review — the bottleneck that every team complains about but few actually fix.",
          "Our approach paired static analysis with a language model fine-tuned on commit messages and PR comments from open-source repositories. The assistant didn't just flag issues; it suggested concrete fixes with diffs, explained the rationale, and learned from which suggestions reviewers accepted or rejected.",
          "The key insight was scoping the model to local diffs rather than entire PRs. This kept suggestions relevant and response times under three seconds. We demoed it live during the final presentation — a deliberately broken PR with five issues. The assistant caught all five and generated accurate fixes for four of them. The fifth was a false positive we'd intentionally seeded to trigger a discussion about trade-offs. The judges appreciated the honesty.",
          "We won first place out of 520 teams. The project later became the foundation for a startup that two of my teammates started. I still advise on the architecture.",
        ],
      },
      {
        title: "Open Source Contributor",
        date: "2021",
        description:
          "Recognized by GitHub in the Arctic Code Vault program for contributions to major frameworks.",
        body: [
          "Open source work started small — a documentation fix in a library I used daily. I noticed a stale code example in the README, sent a PR, and the maintainer merged it within the hour. The dopamine hit was real. I started looking for more ways to contribute: bug fixes, performance patches, eventually architectural proposals.",
          "Over two years, I contributed to three major frameworks that were selected for GitHub's Arctic Code Vault program — a project to preserve open-source code in a decommissioned coal mine in Svalbard for a thousand years. Seeing my commit hashes stored alongside Linux, Python, and the foundational libraries that make modern development possible was humbling.",
          "The most impactful contribution was a change to the React reconciler that reduced unnecessary re-renders in deeply nested context trees. It was a small optimization — about forty lines of code — but it fixed a performance cliff that teams at scale had been working around with awkward memoization hacks. Knowing that code will outlive me, and might help someone a century from now, is the closest I'll get to time travel.",
        ],
      },
    ],
  },
  {
    key: "publications",
    label: "Publications",
    icon: TbWriting,
    items: [
      {
        title: "Scaling React Server Components",
        date: "Oct 2023",
        description:
          "A deep dive into optimizing RSC payloads, featured in Frontend Masters blog with 50k+ reads.",
        body: [
          "Server Components promised a new mental model for React, but the migration path was murky. Teams either went all-in with Next.js or stayed on the sidelines. I wanted to understand where the real wins were — and where the sharp edges still cut.",
          "I spent a month instrumenting RSC payloads across a production Next.js application, measuring serialization overhead, cache hit rates, and the time-to-first-byte impact of moving different component trees to the server. The results surprised me. Most guides recommended migrating leaf components (buttons, cards) to server components, but the biggest wins came from moving data-fetching boundary components — the ones that orchestrate API calls and pass props down.",
          "The article breaks down specific patterns: how to structure server components to maximize cache reuse, when to use client boundaries, and a practical decision tree for migrating existing pages. It resonated because it wasn't abstract theory — every recommendation came with before-and-after metrics from real production traffic.",
          "Fifty thousand reads later, the most rewarding feedback came from teams who reported cutting their initial bundle size by 40% after applying the patterns. That's the kind of impact that makes writing worthwhile.",
        ],
      },
      {
        title: "Zero-Downtime Database Migrations",
        date: "Mar 2022",
        description:
          "Published a comprehensive guide on executing schema changes safely in PostgreSQL.",
        body: [
          "Every team that reaches a certain scale faces the same nightmare: you need to add a NOT NULL column to a table with millions of rows, and you can't afford even a second of downtime. The standard advice — use pt-online-schema-change or gh-ost — doesn't help when you're on PostgreSQL.",
          "I documented the patterns our team developed after a particularly painful migration that took down checkout for twelve minutes on a Friday afternoon. The guide covers the full toolkit: using NOT VALID constraints to avoid table scans, the three-phase column addition workflow, batched backfill strategies with rate limiting, and the critical distinction between transactionally consistent and eventually consistent migration paths.",
          "The post gained traction because it included a runbook template — a reusable set of SQL scripts and a decision matrix for common migration types. Teams at several companies told me they printed it out and kept it as a reference during on-call rotations. That was the highest compliment I could imagine.",
        ],
      },
    ],
  },
  {
    key: "speaking",
    label: "Speaking & Events",
    icon: TbMicrophone2,
    items: [
      {
        title: "ReactNext Speaker",
        date: "Jun 2023",
        description:
          "Delivered a 30-minute talk on 'The Future of State Management' to an audience of 800+ developers.",
        body: [
          "The conference had a strict 'no pitch decks' policy. Every talk had to teach something real or share a hard-won lesson. I chose to talk about the moment our state management strategy broke — when we outgrew the pattern that had carried us for two years.",
          "We started with React Query for server state and Zustand for client state. It worked beautifully until we introduced real-time collaboration features. Suddenly, the clean separation between server and client state blurred. A user's edit needed to update local state, optimistically reflect in the UI, sync to the server, reconcile with other users' changes, and handle conflicts — all within a single interaction cycle.",
          "The talk walked through three architectures we tried and discarded before landing on a solution: a synchronization layer built on top of CRDTs (Conflict-free Replicated Data Types) that sat between React Query and the UI. I showed the actual production code, the bugs we encountered, and the performance benchmarks that justified the complexity.",
          "After the talk, a dozen developers approached me with their own state management war stories. The most memorable was from a developer at a fintech startup who had been struggling with the exact same problem — real-time portfolio updates conflicting with local UI state. We ended up pair-programming on their codebase during the conference lunch break.",
        ],
      },
      {
        title: "Local Meetup Organizer",
        date: "2021–Present",
        description:
          "Host and organize monthly tech meetups for the local JavaScript community.",
        body: [
          "It started with a tweet: 'Anyone in the city interested in a casual React meetup?' Sixty people RSVP'd in the first week. I booked a room above a pub, ordered pizza, and prepared a talk on Suspense patterns I'd been exploring. Twenty people showed up on a rainy Tuesday. We ran out of chairs after eight.",
          "Four years later, the meetup has grown to over 1,200 members. We run two tracks now — a main session with featured speakers and a workshop track for hands-on learning. I stepped back from organizing every event to focus on finding and mentoring new speakers, especially people who have never spoken at a meetup before.",
          "The most rewarding moments aren't the packed rooms. They're the quiet ones: a first-time speaker who was visibly nervous during their dry run delivering a flawless talk to a full room; a junior developer who told me our workshop on debugging React performance gave them the confidence to tackle a production issue the next day; the regular attendee who moved to a new city and started their own meetup inspired by ours.",
        ],
      },
    ],
  },
];

const Achievements = () => {
  useEffect(() => {
    document.title = "Achievements — Andrei Lopez";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen text-foreground relative">
      <AmbientBackground />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 md:px-6 pt-8 pb-24">
        {/* Back nav */}
        <Link
          to="/"
          className="inline-flex items-center sm:gap-1.5 text-sm hover:text-foreground transition-colors mb-10"
        >
          <ChevronLeft className="w-4 h-4" />
          Andrei Lopez
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <p className="text-xl font-semibold tracking-widest uppercase mb-3">
            Profile
          </p>
          {/* Byline rule */}
          <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/8 flex items-center gap-3 text-sm">
            <span>Andrei Lopez</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>Updated 2026</span>
          </div>
        </header>

        {/* Sections */}
        <div className="flex flex-col gap-16">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.key} id={section.key}>
                {/* Section heading */}
                <div className="flex items-center gap-2.5 mb-8">
                  <Icon className="w-4 h-4 shrink-0" />
                  <h2 className="text-[11px] font-semibold tracking-widest uppercase">
                    {section.label}
                  </h2>
                </div>

                {/* Entries */}
                <div className="flex flex-col gap-10">
                  {section.items.map((item, i) => (
                    <article key={item.title}>
                      <div className="flex items-baseline justify-between gap-4 mb-3">
                        <h3 className="font-medium text-[15px] leading-snug">
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-mono shrink-0">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-col gap-4 text-sm leading-[1.75]">
                        {item.body.map((paragraph, j) => (
                          <p key={j}>{paragraph}</p>
                        ))}
                      </div>
                      {i < section.items.length - 1 && (
                        <hr className="mt-10 border-black/8 dark:border-white/6" />
                      )}
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Achievements;

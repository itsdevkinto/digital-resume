import Certifications from "@/components/sections/CertificationsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TechStack from "@/components/sections/TechStack";
import ProjectsSection from "@/components/sections/ProjectsSection";
import RecommendationsCarousel from "@/components/sections/Recommendations";
import GetInTouch from "@/components/sections/GetInTouch";
import Footer from "@/components/sections/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ProfileSection from "@/components/sections/ProfileSection";
import { RevealSequence, SequencedReveal } from "@/components/RevealSequence";

const Sections = () => (
  <>
    <ProfileSection />
    <AboutSection />
    <ExperienceSection />
    <TechStack />
    <ProjectsSection />
    <div className="grid justify-between gap-4 py-4 sm:grid-cols-2 sm:gap-2">
      <Certifications />
      <RecommendationsCarousel />
    </div>
    <GetInTouch />
    <Footer />
  </>
);

const DesktopSections = () => (
  <>
    <RevealSequence step={150}>
      <SequencedReveal>
        <ProfileSection />
      </SequencedReveal>
      <SequencedReveal>
        <AboutSection />
      </SequencedReveal>
      <SequencedReveal>
        <ExperienceSection />
      </SequencedReveal>
      <SequencedReveal>
        <TechStack />
      </SequencedReveal>
    </RevealSequence>
    <ProjectsSection />
    <div className="grid justify-between gap-4 py-4 sm:grid-cols-2 sm:gap-2">
      <Certifications />
      <RecommendationsCarousel />
    </div>
    <GetInTouch />
    <Footer />
  </>
);

const Index = () => (
  <main className="text-foreground min-h-screen">
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10">
      <div className="block md:hidden">
        <Sections />
      </div>
      <div className="hidden md:block">
        <DesktopSections />
      </div>
    </div>
  </main>
);

export default Index;

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
    <div className="grid py-4 sm:grid-cols-2 gap-4 sm:gap-2 justify-between">
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
      <SequencedReveal><ProfileSection /></SequencedReveal>
      <SequencedReveal><AboutSection /></SequencedReveal>
      <SequencedReveal><ExperienceSection /></SequencedReveal>
      <SequencedReveal><TechStack /></SequencedReveal>
    </RevealSequence>
    <ProjectsSection />
    <div className="grid py-4 sm:grid-cols-2 gap-4 sm:gap-2 justify-between">
      <Certifications />
      <RecommendationsCarousel />
    </div>
    <GetInTouch />
    <Footer />
  </>
);

const Index = () => (
  <main className="min-h-screen text-foreground">
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-6 md:py-10">
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

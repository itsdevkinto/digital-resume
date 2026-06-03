import Certifications from "@/components/sections/CertificationsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TechStack from "@/components/sections/TechStack";
import ProjectsSection from "@/components/sections/ProjectsSection";
import RecommendationsCarousel from "@/components/sections/Recommendations";
import GetInTouch from "@/components/sections/GetInTouch";
import Footer from "@/components/sections/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ProfileSection from "@/components/sections/ProfileSection";
import { RevealSequence } from "@/components/RevealSequence";

const Index = () => (
  <main className="min-h-screen text-foreground">
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-6 md:py-10">
        <ProfileSection />

        <AboutSection />
        <ExperienceSection />

        <TechStack />

        <ProjectsSection />

        {/* ── Certifications + Recommendations side by side ── */}
        <RevealSequence >
          <div className="grid py-4 sm:grid-cols-2 gap-4 sm:gap-2 justify-between">
            <Certifications />

            <RecommendationsCarousel />
          </div>
        </RevealSequence>

        <GetInTouch />
        <Footer />
      </div>
    </main>
);

export default Index;

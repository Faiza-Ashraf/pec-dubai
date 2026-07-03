import { AboutSection } from "./about-section";
import { BlueprintStorySection } from "./blueprint-story-section";
import { ContactSection } from "./contact-section";
import { HeroSection } from "./hero-section";
import { ProcessSection } from "./process-section";
import { ProjectsSection } from "./projects-section";
import { ServicesSection } from "./services-section";
import { TestimonialsSection } from "./testimonials-section";
import { WhyPecSection } from "./why-pec-section";

export function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <BlueprintStorySection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <WhyPecSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}

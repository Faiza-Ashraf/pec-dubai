import { ContactSection } from "./contact-section";
import { HeroSection } from "./hero-section";
import { ProcessSection } from "./process-section";
import { ProjectsSection } from "./projects-section";
import { ServicesSection } from "./services-section";
import { TestimonialsSection } from "./testimonials-section";

export function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <ContactSection />
      <TestimonialsSection />
    </main>
  );
}

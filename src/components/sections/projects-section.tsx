import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/home";

export function ProjectsSection() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="bg-[var(--color-obsidian)] py-[clamp(70px,10vw,140px)]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:mb-[52px] md:flex-row md:items-end">
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[var(--color-gold)]">
              Selected Work
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.1] text-[var(--color-white)]">
              Featured <span className="text-[var(--color-gold-light)] italic">Projects</span>
            </h2>
          </div>
          <Button href="#contact" variant="secondary">
            View All Projects →
          </Button>
        </div>

        <div className="grid gap-[10px] lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-[380px_280px]">
          <article className="group relative overflow-hidden max-lg:min-h-[360px] lg:row-[1/3]">
            <div className={`absolute inset-0 bg-gradient-to-br ${featured.palette} transition duration-700 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.34)_60%,transparent_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-7 transition duration-500 group-hover:translate-y-0">
              <div className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                {featured.metrics}
              </div>
              <div className="mt-[7px] font-display text-[clamp(1.3rem,2.5vw,1.9rem)] font-light leading-[1.2] text-[var(--color-white)]">
                {featured.title}
              </div>
              <div className="mt-[6px] flex items-center gap-2 text-[var(--color-fog)] before:h-px before:w-[14px] before:bg-[var(--color-gold)] before:content-['']">
                {featured.location}
              </div>
              <div className="mt-[14px] border-t border-[var(--color-gold-border)] pt-[14px] text-[0.72rem] leading-[1.7] text-[var(--color-ink-soft)]">
                {featured.summary}
              </div>
            </div>
          </article>

          {rest.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden max-lg:min-h-[240px]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.palette} transition duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.34)_60%,transparent_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-7 transition duration-500 group-hover:translate-y-0">
                <div className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                  {project.metrics}
                </div>
                <div className="mt-[7px] font-display text-[clamp(1rem,2.5vw,1.5rem)] font-light leading-[1.2] text-[var(--color-white)]">
                  {project.title}
                </div>
                <div className="mt-[6px] flex items-center gap-2 text-[var(--color-fog)] before:h-px before:w-[14px] before:bg-[var(--color-gold)] before:content-['']">
                  {project.location}
                </div>
                <div className="mt-[14px] border-t border-[var(--color-gold-border)] pt-[14px] text-[0.72rem] leading-[1.7] text-[var(--color-ink-soft)] opacity-0 transition delay-100 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {project.summary}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

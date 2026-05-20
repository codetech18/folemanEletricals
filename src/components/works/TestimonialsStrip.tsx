import { testimonials } from '../../data/testimonials';

export function TestimonialsStrip() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-[#f2f1ed] py-16 md:py-20">
      <div className="mb-10 px-5 md:mb-12 md:px-20">
        <p className="font-mono text-[11px] uppercase tracking-[4px] text-[#777]">What Clients Say</p>
        <h2 className="mt-3 font-display text-[clamp(3.8rem,17vw,8rem)] leading-none text-[#111] md:text-8xl">Trusted Across Lagos</h2>
      </div>
      <div className="testimonial-strip overflow-hidden">
        <div className="testimonial-track flex w-fit gap-6">
          {loop.map((testimonial, index) => (
            <article key={`${testimonial.name}-${index}`} className="min-w-[82vw] shrink-0 border border-[#d8d7d2] bg-white px-7 py-8 sm:min-w-[360px] md:min-w-[380px] md:px-10 md:py-9">
              <div className="mb-4 text-sm text-foleman-yellow">{'★'.repeat(testimonial.rating)}</div>
              <p className="mb-5 text-[15px] italic leading-7 text-[#333]">&quot;{testimonial.quote}&quot;</p>
              <div className="mb-4 h-px bg-[#e8e7e2]" />
              <p className="font-mono text-xs uppercase tracking-[1px] text-[#111]">{testimonial.name}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[1px] text-[#999]">{testimonial.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

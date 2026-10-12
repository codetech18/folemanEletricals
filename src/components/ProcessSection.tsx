const steps = [
  [
    "Tell us what you need",
    "Share the problem, your location and the kind of work you have in mind.",
  ],
  [
    "Discuss the next step",
    "We discuss your requirements and arrange an assessment where needed.",
  ],
  [
    "Installation or repair",
    "The agreed work moves forward, with testing and troubleshooting as required.",
  ],
  [
    "Understand your system",
    "Ask questions about the completed work and any follow-up maintenance.",
  ],
];
export function ProcessSection() {
  return (
    <section id="process" className="process-section">
      <div className="content-width">
        <p className="eyebrow">HOW WE WORK</p>
        <h2>
          A clear path
          <br />
          to getting it sorted.
        </h2>
        <div className="process-grid">
          {steps.map(([title, body], i) => (
            <article key={title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

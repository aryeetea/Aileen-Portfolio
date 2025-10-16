import Container from "./container"; // IMPORTANT: lowercase to match filename

export default function Section({ id, title, eyebrow, children }) {
  return (
    <section id={id} className="py-20 md:py-28 scroll-mt-20">
      <Container>
        {eyebrow && (
          <div className="text-sm uppercase tracking-widest text-[#9f0c0c]/70 font-semibold mb-3">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-8">
            {title}
          </h2>
        )}
        {children}
      </Container>
    </section>
  );
}
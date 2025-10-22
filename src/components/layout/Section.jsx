import Container from "./container";

export default function Section({ id, title, eyebrow, children }) {
  return (
    <section id={id} className="section">
      <Container>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        {title && <h2 className="h2">{title}</h2>}
        {children}
      </Container>
    </section>
  );
}
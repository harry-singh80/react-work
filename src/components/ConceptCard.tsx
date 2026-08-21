type ConceptCardProps = {
  number: string;
  title: string;
  description: string;
  file: string;
};

export function ConceptCard({ number, title, description, file }: ConceptCardProps) {
  return (
    <article className="concept-card">
      <span className="concept-card__number">{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <code>{file}</code>
      </div>
    </article>
  );
}

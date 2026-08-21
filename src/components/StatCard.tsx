type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  tone: "violet" | "blue" | "green" | "orange";
};

export function StatCard({ label, value, detail, tone }: StatCardProps) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <p className="stat-card__label">{label}</p>
      <strong className="stat-card__value">{value}</strong>
      <p className="stat-card__detail">{detail}</p>
    </article>
  );
}

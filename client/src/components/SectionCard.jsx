function renderList(items) {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

export default function SectionCard({ title, subtitle, content, tone = "default" }) {
  return (
    <section className={`card card--${tone}`}>
      <div className="card__header">
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="card__body">
        {Array.isArray(content) ? renderList(content) : <p>{content}</p>}
      </div>
    </section>
  );
}


export default function ReportHeader({ title, summary }) {
  return (
    <section className="report-hero">
      <div>
        <span className="eyebrow">AI Architecture Blueprint</span>
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>
      <div className="report-meta">
        <div>
          <span>Status</span>
          <strong>Prototype-ready</strong>
        </div>
        <div>
          <span>Output style</span>
          <strong>Enterprise recommendation</strong>
        </div>
      </div>
    </section>
  );
}


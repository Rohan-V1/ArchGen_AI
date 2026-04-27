import SectionCard from "./SectionCard";

export default function ArchitecturePanel({ report }) {
  const techStackContent = [
    ...report.techStack.frontend.map((item) => `Frontend: ${item}`),
    ...report.techStack.backend.map((item) => `Backend: ${item}`),
    ...report.techStack.database.map((item) => `Database: ${item}`),
    ...report.techStack.infra.map((item) => `Infrastructure: ${item}`)
  ];

  return (
    <div className="report-grid">
      <SectionCard
        title="Suggested System Architecture"
        subtitle={report.architecture.pattern}
        content={[
          report.architecture.overview,
          ...report.architecture.components.map((item) => `Component: ${item}`),
          ...report.architecture.dataFlow.map((item) => `Flow: ${item}`)
        ]}
      />
      <SectionCard title="Recommended Tech Stack" content={techStackContent} tone="highlight" />
      <SectionCard
        title="Database Design Suggestion"
        subtitle={report.databaseDesign.overview}
        content={report.databaseDesign.entities.map((item) => `Entity: ${item}`)}
      />
      <SectionCard title="Required APIs / Modules" content={report.apisAndModules} />
      <SectionCard title="Security Recommendations" content={report.security} />
      <SectionCard title="Scaling Suggestions" content={report.scaling} />
      <SectionCard title="Deployment Recommendations" content={report.deployment} tone="accent" />
      <SectionCard title="Delivery Checklist" content={report.deliveryChecklist} />
      <SectionCard title="Product Notes" content={report.productNotes} />
    </div>
  );
}


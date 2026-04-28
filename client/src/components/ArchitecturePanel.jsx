import {
  AgentPipelineBlock,
  ArchitectureBlock,
  TechStackBlock,
  DatabaseBlock,
  NumberedListBlock,
  GoogleReviewBlock,
  SECTION_ICONS
} from "./OutputBlocks";
import OutputToc from "./OutputToc";

export default function ArchitecturePanel({ report }) {
  const tocItems = [
    report.agentPipeline && { id: "agent-pipeline", label: "Agent Pipeline" },
    { id: "architecture", label: "Architecture" },
    { id: "tech-stack", label: "Tech Stack" },
    { id: "database", label: "Database" },
    report.apisAndModules?.length && { id: "apis", label: "APIs & Modules" },
    report.security?.length && { id: "security", label: "Security" },
    report.scaling?.length && { id: "scaling", label: "Scaling" },
    report.deployment?.length && { id: "deployment", label: "Deployment" },
    report.googleAgentReview && { id: "google-review", label: "Google Verdict" },
    report.deliveryChecklist?.length && { id: "checklist", label: "Delivery Checklist" },
    report.productNotes?.length && { id: "notes", label: "Product Notes" }
  ].filter(Boolean);

  return (
    <div className="output-layout">
      <div className="output-blocks">
        <AgentPipelineBlock pipeline={report.agentPipeline} />
        <ArchitectureBlock architecture={report.architecture} />
        <TechStackBlock techStack={report.techStack} />
        <DatabaseBlock db={report.databaseDesign} />
        <NumberedListBlock
          id="apis"
          title="Required APIs / Modules"
          items={report.apisAndModules}
          icon={SECTION_ICONS.apis}
        />
        <NumberedListBlock
          id="security"
          title="Security Recommendations"
          items={report.security}
          icon={SECTION_ICONS.security}
          tone="security"
        />
        <NumberedListBlock
          id="scaling"
          title="Scaling Suggestions"
          items={report.scaling}
          icon={SECTION_ICONS.scaling}
          tone="scale"
        />
        <NumberedListBlock
          id="deployment"
          title="Deployment Recommendations"
          items={report.deployment}
          icon={SECTION_ICONS.deployment}
          tone="deploy"
        />
        <GoogleReviewBlock review={report.googleAgentReview} />
        <NumberedListBlock
          id="checklist"
          title="Delivery Checklist"
          items={report.deliveryChecklist}
          icon={SECTION_ICONS.checklist}
        />
        <NumberedListBlock
          id="notes"
          title="Product Notes"
          items={report.productNotes}
          icon={SECTION_ICONS.notes}
        />
      </div>
      <aside className="output-toc-wrap">
        <OutputToc items={tocItems} />
      </aside>
    </div>
  );
}

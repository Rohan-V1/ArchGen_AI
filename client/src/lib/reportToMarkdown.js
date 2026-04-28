function bullets(items) {
  if (!items || !items.length) return "";
  return items.map((item) => `- ${item}`).join("\n");
}

function section(heading, body) {
  if (!body || !body.trim()) return "";
  return `## ${heading}\n\n${body}\n`;
}

export function reportToMarkdown(report) {
  if (!report) return "";

  const parts = [];
  parts.push(`# ${report.title}\n`);
  if (report.summary) parts.push(`> ${report.summary}\n`);

  if (report.agentPipeline) {
    parts.push(
      section(
        "AI Agent Pipeline",
        bullets([
          `Stage 1: ${report.agentPipeline.primaryGenerator}`,
          `Stage 2: ${report.agentPipeline.secondaryReviewer}`
        ])
      )
    );
  }

  if (report.architecture) {
    parts.push(
      section(
        `Suggested System Architecture${report.architecture.pattern ? ` — ${report.architecture.pattern}` : ""}`,
        [
          report.architecture.overview,
          bullets((report.architecture.components || []).map((c) => `Component: ${c}`)),
          bullets((report.architecture.dataFlow || []).map((c) => `Flow: ${c}`))
        ]
          .filter(Boolean)
          .join("\n\n")
      )
    );
  }

  if (report.techStack) {
    const t = report.techStack;
    parts.push(
      section(
        "Recommended Tech Stack",
        bullets([
          ...(t.frontend || []).map((x) => `Frontend: ${x}`),
          ...(t.backend || []).map((x) => `Backend: ${x}`),
          ...(t.database || []).map((x) => `Database: ${x}`),
          ...(t.infra || []).map((x) => `Infrastructure: ${x}`)
        ])
      )
    );
  }

  if (report.databaseDesign) {
    parts.push(
      section(
        "Database Design",
        [
          report.databaseDesign.overview,
          bullets((report.databaseDesign.entities || []).map((e) => `Entity: ${e}`))
        ]
          .filter(Boolean)
          .join("\n\n")
      )
    );
  }

  parts.push(section("Required APIs / Modules", bullets(report.apisAndModules)));
  parts.push(section("Security Recommendations", bullets(report.security)));
  parts.push(section("Scaling Suggestions", bullets(report.scaling)));
  parts.push(section("Deployment Recommendations", bullets(report.deployment)));

  if (report.googleAgentReview) {
    const g = report.googleAgentReview;
    parts.push(
      section(
        `Google Agent Verdict${g.verdict ? ` — ${g.verdict}` : ""}`,
        [
          g.summary,
          bullets((g.mvpRisks || []).map((x) => `MVP risk: ${x}`)),
          bullets((g.missingModules || []).map((x) => `Missing module: ${x}`)),
          bullets((g.securityGaps || []).map((x) => `Security gap: ${x}`)),
          bullets((g.refinements || []).map((x) => `Refinement: ${x}`))
        ]
          .filter(Boolean)
          .join("\n\n")
      )
    );
  }

  parts.push(section("Delivery Checklist", bullets(report.deliveryChecklist)));
  parts.push(section("Product Notes", bullets(report.productNotes)));

  return parts.filter(Boolean).join("\n").trim() + "\n";
}

function toArray(value, fallback = []) {
  return Array.isArray(value) ? value.filter(Boolean).map(String) : fallback;
}

function toString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export function normalizeReport(report) {
  return {
    title: toString(report?.title, "AI-Generated System Architecture Blueprint"),
    summary: toString(
      report?.summary,
      "This recommendation outlines a practical prototype architecture with room for future growth."
    ),
    architecture: {
      pattern: toString(report?.architecture?.pattern, "Modular monolith with clean API boundaries"),
      overview: toString(
        report?.architecture?.overview,
        "A React frontend communicates with an Express backend that manages business logic and data access."
      ),
      components: toArray(report?.architecture?.components),
      dataFlow: toArray(report?.architecture?.dataFlow)
    },
    techStack: {
      frontend: toArray(report?.techStack?.frontend, ["React", "Vite"]),
      backend: toArray(report?.techStack?.backend, ["Node.js", "Express"]),
      database: toArray(report?.techStack?.database, ["PostgreSQL"]),
      infra: toArray(report?.techStack?.infra, ["Vercel", "Render"])
    },
    databaseDesign: {
      overview: toString(
        report?.databaseDesign?.overview,
        "Use a relational schema that models users, business entities, and operational records."
      ),
      entities: toArray(report?.databaseDesign?.entities)
    },
    apisAndModules: toArray(report?.apisAndModules),
    security: toArray(report?.security),
    scaling: toArray(report?.scaling),
    deployment: toArray(report?.deployment),
    productNotes: toArray(report?.productNotes),
    deliveryChecklist: toArray(report?.deliveryChecklist)
  };
}


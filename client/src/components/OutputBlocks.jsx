import { useState } from "react";
import {
  Copy,
  Check,
  ArrowRight,
  Layers,
  Boxes,
  Database,
  Plug,
  ShieldCheck,
  TrendingUp,
  Cloud,
  Sparkles,
  ListChecks,
  StickyNote,
  Workflow,
  AlertTriangle,
  PackageOpen,
  Lock,
  Wand2,
  Zap
} from "lucide-react";

function CopyButton({ getText, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  async function handle() {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  }
  return (
    <button
      type="button"
      className={`icon-button icon-button--ghost${copied ? " is-success" : ""}`}
      onClick={handle}
      aria-label={`${label} section`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function SectionShell({ id, title, subtitle, icon: Icon, tone = "default", copyText, children }) {
  return (
    <section id={id} className={`block block--${tone}`}>
      <header className="block__header">
        {Icon ? (
          <span className="block__icon" aria-hidden="true">
            <Icon size={18} strokeWidth={2.1} />
          </span>
        ) : null}
        <div className="block__title">
          <h3>{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {copyText ? <CopyButton getText={() => copyText} /> : null}
      </header>
      <div className="block__body">{children}</div>
    </section>
  );
}

export function AgentPipelineBlock({ pipeline }) {
  if (!pipeline) return null;
  return (
    <SectionShell
      id="agent-pipeline"
      title="AI Agent Pipeline"
      subtitle="Two-stage generation flow"
      icon={Workflow}
      tone="accent"
    >
      <ol className="pipeline">
        <li>
          <span className="pipeline__step">
            <Wand2 size={14} /> Stage 1
          </span>
          <strong>{pipeline.primaryGenerator}</strong>
        </li>
        <li className="pipeline__arrow" aria-hidden="true">
          <ArrowRight size={16} />
        </li>
        <li>
          <span className="pipeline__step">
            <Sparkles size={14} /> Stage 2
          </span>
          <strong>{pipeline.secondaryReviewer}</strong>
        </li>
      </ol>
    </SectionShell>
  );
}

export function ArchitectureBlock({ architecture }) {
  const copyText = [
    `## Suggested System Architecture — ${architecture.pattern}`,
    "",
    architecture.overview,
    "",
    "### Components",
    ...architecture.components.map((c) => `- ${c}`),
    "",
    "### Data Flow",
    ...architecture.dataFlow.map((c) => `- ${c}`)
  ].join("\n");

  return (
    <SectionShell
      id="architecture"
      title="Suggested System Architecture"
      subtitle={architecture.pattern}
      icon={Layers}
      copyText={copyText}
    >
      <p className="block__overview">{architecture.overview}</p>

      {architecture.components.length ? (
        <div className="subblock">
          <span className="subblock__label">Components</span>
          <div className="component-grid">
            {architecture.components.map((c, i) => (
              <div key={`${c}-${i}`} className="component-tile">
                <span className="component-tile__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="component-tile__text">{c}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {architecture.dataFlow.length ? (
        <div className="subblock">
          <span className="subblock__label">Data Flow</span>
          <ol className="flow-steps">
            {architecture.dataFlow.map((step, i) => (
              <li key={`${step}-${i}`}>
                <span className="flow-steps__num">{i + 1}</span>
                <span className="flow-steps__text">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </SectionShell>
  );
}

const STACK_GROUPS = [
  { key: "frontend", label: "Frontend", color: "var(--accent)" },
  { key: "backend", label: "Backend", color: "var(--accent-2)" },
  { key: "database", label: "Database", color: "#f59e0b" },
  { key: "infra", label: "Infrastructure", color: "#a78bfa" }
];

export function TechStackBlock({ techStack }) {
  const copyText = [
    "## Recommended Tech Stack",
    "",
    ...STACK_GROUPS.flatMap((g) => [`### ${g.label}`, ...(techStack[g.key] || []).map((x) => `- ${x}`), ""])
  ].join("\n");

  return (
    <SectionShell
      id="tech-stack"
      title="Recommended Tech Stack"
      icon={Boxes}
      tone="highlight"
      copyText={copyText}
    >
      <div className="stack-grid">
        {STACK_GROUPS.map((g) => {
          const items = techStack[g.key] || [];
          if (!items.length) return null;
          return (
            <div key={g.key} className="stack-group">
              <span
                className="stack-group__label"
                style={{ "--dot": g.color }}
              >
                {g.label}
              </span>
              <div className="stack-group__chips">
                {items.map((item, i) => (
                  <span key={`${item}-${i}`} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function DatabaseBlock({ db }) {
  const copyText = [
    "## Database Design",
    "",
    db.overview,
    "",
    "### Entities",
    ...db.entities.map((e) => `- ${e}`)
  ].join("\n");

  return (
    <SectionShell
      id="database"
      title="Database Design"
      subtitle={db.overview}
      icon={Database}
      copyText={copyText}
    >
      {db.entities.length ? (
        <div className="entity-grid">
          {db.entities.map((entity, i) => (
            <div key={`${entity}-${i}`} className="entity-tile">
              <Database size={14} aria-hidden="true" />
              <span>{entity}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="block__muted">No entities provided.</p>
      )}
    </SectionShell>
  );
}

export function NumberedListBlock({ id, title, items, icon, tone = "default" }) {
  if (!items?.length) return null;
  const copyText = [`## ${title}`, "", ...items.map((x, i) => `${i + 1}. ${x}`)].join("\n");
  return (
    <SectionShell id={id} title={title} icon={icon} tone={tone} copyText={copyText}>
      <ol className="num-list">
        {items.map((item, i) => (
          <li key={`${item}-${i}`}>
            <span className="num-list__num">{String(i + 1).padStart(2, "0")}</span>
            <span className="num-list__text">{item}</span>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

const VERDICT_TONE = {
  approved: "success",
  needs_revision: "warn",
  rejected: "danger"
};

function verdictTone(verdict = "") {
  const v = verdict.toLowerCase().replace(/\s+/g, "_");
  return VERDICT_TONE[v] || "neutral";
}

export function GoogleReviewBlock({ review }) {
  if (!review) return null;
  const tone = verdictTone(review.verdict);
  const groups = [
    { label: "MVP risks", items: review.mvpRisks || [], icon: AlertTriangle, accent: "var(--warn)" },
    { label: "Missing modules", items: review.missingModules || [], icon: PackageOpen, accent: "#a78bfa" },
    { label: "Security gaps", items: review.securityGaps || [], icon: Lock, accent: "var(--danger)" },
    { label: "Refinements", items: review.refinements || [], icon: Sparkles, accent: "var(--accent)" }
  ].filter((g) => g.items.length);

  const copyText = [
    `## Google Agent Verdict — ${review.verdict || "n/a"}`,
    "",
    review.summary || "",
    "",
    ...groups.flatMap((g) => [`### ${g.label}`, ...g.items.map((x) => `- ${x}`), ""])
  ].join("\n");

  return (
    <SectionShell
      id="google-review"
      title="Google Agent Verdict"
      icon={Sparkles}
      tone="highlight"
      copyText={copyText}
    >
      <div className="verdict-row">
        <span className={`verdict-pill verdict-pill--${tone}`}>
          <span className="verdict-pill__dot" /> {review.verdict || "Reviewed"}
        </span>
        <p className="block__overview verdict-summary">{review.summary}</p>
      </div>

      {groups.length ? (
        <div className="review-grid">
          {groups.map((g) => (
            <div key={g.label} className="review-card" style={{ "--accent": g.accent }}>
              <header>
                <g.icon size={14} />
                <span>{g.label}</span>
                <span className="review-card__count">{g.items.length}</span>
              </header>
              <ul>
                {g.items.map((item, i) => (
                  <li key={`${item}-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </SectionShell>
  );
}

export const SECTION_ICONS = {
  apis: Plug,
  security: ShieldCheck,
  scaling: TrendingUp,
  deployment: Cloud,
  checklist: ListChecks,
  notes: StickyNote,
  zap: Zap
};

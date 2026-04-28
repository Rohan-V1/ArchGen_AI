import { useState } from "react";
import {
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  AlertCircle,
  Wand2,
  ArrowRight,
  FileText
} from "lucide-react";
import { generateArchitecture } from "./lib/api";
import { samplePrompts } from "./data/samplePrompts";
import ReportHeader from "./components/ReportHeader";
import ArchitecturePanel from "./components/ArchitecturePanel";
import Spinner from "./components/Spinner";
import Skeleton from "./components/Skeleton";

const initialRequirement = samplePrompts[0].value;
const MAX_CHARS = 1200;

export default function App() {
  const [requirement, setRequirement] = useState(initialRequirement);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!requirement.trim() || loading) return;
    setLoading(true);
    setError("");

    try {
      const data = await generateArchitecture(requirement);
      setReport(data);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  const charCount = requirement.length;
  const overLimit = charCount > MAX_CHARS;
  const canSubmit = requirement.trim().length > 0 && !overLimit;

  return (
    <div className="page-shell">
      <div className="backdrop backdrop--left" />
      <div className="backdrop backdrop--right" />

      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__glyph" aria-hidden="true">
            <Sparkles size={20} strokeWidth={2.2} />
          </span>
          <div>
            <p className="topbar__title">ArchGen AI</p>
            <p className="topbar__subtitle">Requirement → System Architecture</p>
          </div>
        </div>
        <p className="topbar__stack">
          <Zap size={14} /> Multi-agent AI review
        </p>
      </header>

      <main className="layout">
        <section className="hero">
          <div className="hero__content">
            <span className="eyebrow">AI-assisted solution architecture</span>
            <h1>Turn raw project ideas into structured architecture blueprints.</h1>
            <p>
              Designed for hackathons, capstones, freelancers, and startup ideation. Enter a
              plain-English requirement and get a professional report covering architecture, stack,
              database, APIs, security, scale, and deployment.
            </p>
          </div>

          <div className="hero__panel">
            <div className="stat-card">
              <span className="stat-card__icon" aria-hidden="true">
                <Target size={18} />
              </span>
              <div className="stat-card__body">
                <span>Prototype scope</span>
                <strong>Two-stage AI planning workflow</strong>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-card__icon" aria-hidden="true">
                <FileText size={18} />
              </span>
              <div className="stat-card__body">
                <span>Output quality</span>
                <strong>Architect-style structured report</strong>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-card__icon" aria-hidden="true">
                <ShieldCheck size={18} />
              </span>
              <div className="stat-card__body">
                <span>Review agent</span>
                <strong>Architecture review pass</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="workspace">
          <div className="input-panel">
            <div className="section-heading">
              <h2>Project Requirement</h2>
              <p>Describe the application like a client or founder would explain it.</p>
            </div>

            <form onSubmit={handleSubmit} className="input-form">
              <label htmlFor="requirement-textarea">
                <span>Describe your idea</span>
                <span
                  className="char-count"
                  style={overLimit ? { color: "var(--danger)" } : undefined}
                >
                  {charCount} / {MAX_CHARS}
                </span>
              </label>
              <textarea
                id="requirement-textarea"
                value={requirement}
                onChange={(event) => setRequirement(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your product idea here..."
                rows={8}
                aria-describedby="submit-hint"
              />

              <div className="prompt-row" role="group" aria-label="Sample prompts">
                <span className="prompt-row__label">Try a sample</span>
                {samplePrompts.map((prompt) => {
                  const active = requirement.trim() === prompt.value.trim();
                  return (
                    <button
                      key={prompt.label}
                      type="button"
                      className={`chip${active ? " is-active" : ""}`}
                      onClick={() => setRequirement(prompt.value)}
                      aria-pressed={active}
                    >
                      {prompt.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="submit"
                className="primary-button"
                disabled={!canSubmit || loading}
                id="submit-hint"
              >
                {loading ? (
                  <>
                    <Spinner /> Generating architecture...
                  </>
                ) : (
                  <>
                    <Wand2 size={16} /> Generate Architecture
                    <span className="kbd-hint">⌘ ↵</span>
                  </>
                )}
              </button>
            </form>

            {error ? (
              <div className="error-banner" role="alert" aria-live="polite">
                <AlertCircle size={16} aria-hidden="true" />
                <span>{error}</span>
              </div>
            ) : null}
          </div>

          <div className="output-panel" aria-busy={loading}>
            {loading && !report ? (
              <Skeleton />
            ) : report ? (
              <>
                <ReportHeader report={report} />
                <ArchitecturePanel report={report} />
              </>
            ) : (
              <div className="empty-state">
                <span className="empty-state__glyph" aria-hidden="true">
                  <Sparkles size={28} strokeWidth={1.8} />
                </span>
                <span className="eyebrow">Output Preview</span>
                <h2>Your architecture recommendation will appear here.</h2>
                <p>
                  Output is formatted like an initial solution architect document — useful for
                  demos, project submissions, and early planning conversations.
                </p>
                <p style={{ marginTop: "8px", fontSize: "0.85rem", color: "var(--text-faint)" }}>
                  Press <span className="kbd">⌘</span> + <span className="kbd">↵</span> to generate{" "}
                  <ArrowRight size={12} style={{ verticalAlign: "middle" }} />
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

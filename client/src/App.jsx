import { useState } from "react";
import { generateArchitecture } from "./lib/api";
import { samplePrompts } from "./data/samplePrompts";
import ReportHeader from "./components/ReportHeader";
import ArchitecturePanel from "./components/ArchitecturePanel";

const initialRequirement = samplePrompts[0].value;

export default function App() {
  const [requirement, setRequirement] = useState(initialRequirement);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
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

  return (
    <div className="page-shell">
      <div className="backdrop backdrop--left" />
      <div className="backdrop backdrop--right" />

      <header className="topbar">
        <div>
          <span className="brand-mark">ArchGen AI</span>
          <p>Requirement to System Architecture Generator</p>
        </div>
        <p className="topbar__stack">Groq generator + Google review agent</p>
      </header>

      <main className="layout">
        <section className="hero">
          <div className="hero__content">
            <span className="eyebrow">AI-assisted solution architecture</span>
            <h1>Turn raw project ideas into structured architecture blueprints.</h1>
            <p>
              Designed for hackathons, capstones, freelancers, and startup ideation. Enter a plain-English requirement
              and get a professional report covering architecture, stack, database, APIs, security, scale, and
              deployment.
            </p>
          </div>

          <div className="hero__panel">
            <div className="stat-card">
              <span>Prototype scope</span>
              <strong>Two-stage AI planning workflow</strong>
            </div>
            <div className="stat-card">
              <span>Output quality</span>
              <strong>Architect-style structured report</strong>
            </div>
            <div className="stat-card">
              <span>Google agent</span>
              <strong>Gemini architecture review pass</strong>
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
              <textarea
                value={requirement}
                onChange={(event) => setRequirement(event.target.value)}
                placeholder="Describe your product idea here..."
                rows={8}
              />

              <div className="prompt-row">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    className="chip"
                    onClick={() => setRequirement(prompt.value)}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              <button type="submit" className="primary-button" disabled={loading || !requirement.trim()}>
                {loading ? "Generating Architecture..." : "Generate Architecture"}
              </button>
            </form>

            {error ? <div className="error-banner">{error}</div> : null}
          </div>

          <div className="output-panel">
            {report ? (
              <>
                <ReportHeader title={report.title} summary={report.summary} />
                <ArchitecturePanel report={report} />
              </>
            ) : (
              <div className="empty-state">
                <span className="eyebrow">Output Preview</span>
                <h2>Your architecture recommendation will appear here.</h2>
                <p>
                  The result is formatted like an initial solution architect document so it feels useful in demos,
                  project submissions, and early planning conversations.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { reportToMarkdown } from "../lib/reportToMarkdown";

export default function ReportHeader({ report }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(reportToMarkdown(report));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — silently ignore
    }
  }

  return (
    <section className="report-hero">
      <div className="report-hero__lead">
        <span className="eyebrow">AI Architecture Blueprint</span>
        <h2>{report.title}</h2>
        <p>{report.summary}</p>
      </div>
      <div className="report-hero__actions">
        <span className="status-pill">
          <span className="status-pill__dot" aria-hidden="true" />
          Prototype-ready
        </span>
        <button
          type="button"
          className={`icon-button${copied ? " is-success" : ""}`}
          onClick={handleCopy}
          aria-label="Copy report as Markdown"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy MD"}
        </button>
      </div>
    </section>
  );
}

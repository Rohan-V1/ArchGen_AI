import { useEffect, useState } from "react";

export default function OutputToc({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items.map((it) => document.getElementById(it.id)).filter(Boolean);
    if (!targets.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [items]);

  function handleClick(event, id) {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  }

  return (
    <nav className="toc" aria-label="Report sections">
      <span className="toc__label">On this page</span>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={active === it.id ? "is-active" : ""}
              onClick={(e) => handleClick(e, it.id)}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

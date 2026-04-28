export default function Skeleton() {
  return (
    <div className="skeleton" aria-hidden="true">
      <div className="skeleton__hero" />
      <div className="skeleton__grid">
        <div className="skeleton__card" />
        <div className="skeleton__card" />
        <div className="skeleton__card" />
        <div className="skeleton__card" />
        <div className="skeleton__card" />
        <div className="skeleton__card" />
      </div>
    </div>
  );
}

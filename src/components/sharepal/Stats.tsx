export default function Stats() {
  return <section className="stats-section" aria-label="Our community impact">
    {[["250Cr+", "Saved Together"], ["4.5M Kg", "CO₂e Emissions Saved"], ["100K+", "Products in Circulation"]].map(([value,label]) =>
      <div key={label}><p>{value}</p><span>{label}</span></div>)}
  </section>;
}

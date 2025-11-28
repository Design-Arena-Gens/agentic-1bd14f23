export default function ScrollIndicator() {
  return (
    <div aria-hidden style={{
      position: "absolute",
      left: 0, right: 0, bottom: 20,
      display: "grid", placeItems: "center",
      pointerEvents: "none"
    }}>
      <div style={{
        width: 22, height: 36, borderRadius: 14,
        border: "2px solid rgba(255,255,255,.35)",
        display: "grid", placeItems: "center"
      }}>
        <div style={{
          width: 3, height: 8, borderRadius: 2,
          background: "rgba(255,255,255,.65)",
          animation: "scrollDot 1.6s ease-in-out infinite"
        }} />
      </div>
      <style>{`@keyframes scrollDot { 0%{ transform: translateY(-8px); opacity:.2 } 50%{ opacity:1 } 100%{ transform: translateY(6px); opacity:.2 } }`}</style>
    </div>
  );
}

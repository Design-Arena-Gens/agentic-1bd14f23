import ParallaxCar from "./components/ParallaxCar";
import CanvasRoad from "./components/CanvasRoad";
import ScrollIndicator from "./components/ScrollIndicator";

export default function Page() {
  return (
    <main>
      <CanvasRoad />

      <section className="fullscreen hero container" aria-label="Hero">
        <div>
          <h1 className="title">GAME CAR</h1>
          <p className="subtitle">Cinematic 4K scrolling racer showcase ? smooth, glossy, fast.</p>
          <div style={{ height: 20 }} />
          <div className="badges">
            <span className="badge">4K Ready</span>
            <span className="badge">60fps Canvas</span>
            <span className="badge">Parallax</span>
            <span className="badge">Vercel</span>
          </div>
          <a className="cta" href="#car">Scroll to Explore ?</a>
          <ScrollIndicator />
        </div>
      </section>

      <div className="hr" />

      <section id="car" className="fullscreen container" aria-label="Parallax Car">
        <div className="grid-2">
          <div className="sticky">
            <ParallaxCar />
          </div>
          <div>
            <h2 className="section-title">Born for Speed</h2>
            <p className="muted">
              Glide through neon streets while the world blurs away. Precision curves, low latency
              controls, and an engine tuned for pure momentum.
            </p>
            <div style={{ height: 16 }} />
            <ul>
              <li>Adaptive parallax depth with scroll progress</li>
              <li>Hi-DPI vector rendering for razor-sharp edges</li>
              <li>GPU-friendly transforms and sticky layout</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="hr" />

      <section className="fullscreen container" aria-label="Features">
        <div className="grid-2">
          <div>
            <h2 className="section-title">Dynamic Road</h2>
            <p className="muted">
              The canvas road below streams at variable speed based on your scroll velocity, creating
              a tangible sense of acceleration.
            </p>
            <div style={{ height: 12 }} />
            <ul>
              <li>Vector lane guides, glow and motion blur</li>
              <li>Pixel-perfect scaling up to 4K+</li>
              <li>Zero image assets required</li>
            </ul>
          </div>
          <div>
            <div style={{
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 16,
              padding: 24,
              backdropFilter: "blur(8px)",
              background: "linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0))",
            }}>
              <h3 style={{ marginTop: 0 }}>Ultra Settings</h3>
              <p className="muted">Optimized CSS and Canvas ensure frames stay smooth even on ultra-wide and 4K displays.</p>
              <div style={{ height: 12 }} />
              <div className="badges">
                <span className="badge">HDR-ish Glow</span>
                <span className="badge">Sticky Parallax</span>
                <span className="badge">No Images</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer container">
        Built for thrills ? ? GAME CAR
      </footer>
    </main>
  );
}

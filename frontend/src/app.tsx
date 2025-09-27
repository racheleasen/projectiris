// src/App.tsx (Site Header, Persistent Across Pages)
import React, { useEffect, useState } from "react";
import GazeDemo from "./pages/GazeDemo";

// Key used for storing/retrieving user analytics consent from localStorage
const ANALYTICS_KEY = "iris_analytics_consent";

// ---------- Sticky Site Header ----------
function SiteHeader() {
  return (
    <header className="site-header" role="banner" aria-label="Site header">
      <div className="site-header__inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">●</span>
          <span className="brand-text">project iris</span>
        </div>

        {/* Placeholder nav links — replace with real routes when ready */}
        <nav className="nav" aria-label="Primary">
          <a className="nav-link" href="#learn more">learn more</a>
          <a className="nav-link" href="#privacy">privacy</a>
          <a className="nav-link" href="#demo">demo</a>
        </nav>
      </div>
    </header>
  );
}

// ---------- Main App Component ----------
export default function App() {
  const [consent, setConsent] = useState<boolean>(false);         // Whether user allows gaze analytics
  const [cameraConsent, setCameraConsent] = useState<boolean>(false); // Whether user enabled camera access

  // On mount, restore consent preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(ANALYTICS_KEY);
    if (saved === "true") setConsent(true);
  }, []);

  // Persist consent preference when updated
  useEffect(() => {
    localStorage.setItem(ANALYTICS_KEY, String(consent));
  }, [consent]);

  // When user opts in to camera access
  const handleEnableCamera = () => {
    setCameraConsent(true);
    setConsent(true); // Implicitly opt into analytics too
  };

  return (
    <div className="app-root">
      <SiteHeader />

      {/* ---------- Main Page ---------- */}
      <main className="page" role="main">
        {cameraConsent ? (
          // If camera is enabled, show gaze demo interface
          <div className="background">
            <section className="main-content" aria-label="Gaze Demo">
              <div className="page-head">
                <h1 className="title">Gaze Calibration</h1>
                <p className="subtitle">
                  Placeholder. Camera and test pointer are live, but no calibration targets are programmed at this time
                </p>
              </div>

              <hr className="header-divider" />
              <GazeDemo consent={consent} />  {/* Live gaze tracker */}
              <div className="info-text">
                <h4>*No gaze analytics are being stored at this time.</h4>
              </div>

              <hr className="header-divider" />
              <footer className="spacer-footer" aria-hidden="true" />

              {/* ---------- Privacy Disclosure ---------- */}
              <details className="privacy-details" id="privacy">
                <summary>Privacy & data handling</summary>
                <ul>
                  <li>Video stays on-device for inference; no raw frames are sent by default.</li>
                  <li>Web analytics help performance and device monitoring (e.g., load time, device type, browser).</li>
                  <li>“Derived data” includes normalized vectors and timing metrics only; it excludes images and identifiable A/V.</li>
                  <li>You can revoke gaze analytics consent anytime via the checkbox below.</li>
                </ul>
              </details>

              {/* ---------- Consent Toggle ---------- */}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  aria-label="Consent to anonymized analytics"
                />
                <span>
                  I consent to sending anonymized gaze analytics to the backend for analysis.
                </span>
              </label>
            </section>
          </div>
        ) : (
          // ---------- Pre-consent welcome screen ----------
          <section className="consent-wrap" aria-label="Consent">
            <div className="consent-card">
              <h3 className="title">Gaze Communication Assistance</h3>
              <p className="subtitle">
                Camera access must be enabled to use this tool.
                By completing gaze calibration, you’ll help improve eye-tracking accuracy and make the experience better for everyone.
              </p>

              <hr className="header-divider" />

              <p className="lead">
                <h3>Privacy & Analytics</h3>
                No raw video or audio is ever stored or uploaded. Anonymized web analytics and eye-tracking data (like gaze points and timing) may be sent to improve accuracy and performance.
                You can opt out of gaze analytics anytime.
              </p>

              <button className="consent-button" onClick={handleEnableCamera}>
                Opt-In &amp; Continue
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Styles */}
      <style>{`
        :root { --header-h: 64px; }

        /* App baseline */
        html, body, #root { height: 100%; }
        html, body { margin: 0; padding: 0; }
        .app-root {
          min-height: 100%;
          background: #0b0b0c;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Apple Color Emoji","Segoe UI Emoji";
          color: #fff;
        }

        /* Sticky site header (black w/ white text) */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: var(--header-h);
          background: #000;
          color: #fff;
          border-bottom: 1px solid #161616;
        }
        .site-header__inner {
          max-width: 1100px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
        }
        .brand {
          display: flex; align-items: center; gap: 10px;
          font-weight: 700; letter-spacing: 0.3px;
        }
        .brand-mark {
          width: 12px; height: 12px; background: #0afe0a; border-radius: 999px; display: inline-block;
        }
        .brand-text { font-size: 24px; font-weight: 500;}
        .nav { display: flex; gap: 24px; }
        .nav-link {
          color: #fff; text-decoration: none; font-size: 14px; opacity: 0.9;
        }
        .nav-link:hover { opacity: 1; text-decoration: underline; }

        /* Page area under header */
        .page {
          min-height: calc(100dvh - var(--header-h));
          padding: 24px 16px;
          display: grid;
          place-items: start center;
        }

        /* White content card when camera is enabled */
        .background {
          width: min(100%, 1100px);
          background: #ffffff;
          box-shadow: 0 6px 28px rgba(0,0,0,0.35);
          border-radius: 12px;
          color: #000;
        }
        .main-content {
          padding: 2rem 1.25rem 3rem;
        }

        .page-head .title {
          margin: 0 0 0.25rem 0;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          line-height: 1.15;
          color: #000;
        }
        .page-head .subtitle, .subtitle {
          margin: 0.25rem 0 0.5rem 0;
          color: #50555a;
          font-weight: 300;
          font-size: clamp(0.98rem, 1.2vw, 1.05rem);
        }

        .checkbox-label {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: start;
          gap: 0.55rem 0.6rem;
          max-width: 100%;
          font-size: 0.95rem;
          color: #222;
          margin: 0.5rem 0 0.75rem;
        }
        .checkbox-label input { margin-top: 0.35rem; }

        .header-divider {
          border: none;
          border-top: 1px solid #e8eaef;
          margin: 1rem 0 1.25rem;
        }

        .info-text { color: #333; line-height: 1.5; margin: 1rem 0; }
        .privacy-details { font-size: 0.95rem; color: #222; }

        /* Consent screen under sticky header */
        .consent-wrap {
          width: 100%;
          min-height: calc(100dvh));
          display: grid;
          place-items: center;
          padding: 24px 10px;
        }
        .consent-card {
          width: min(100%, 780px);
          background: #fff;
          color: #000;
          border-radius: 12px;
          box-shadow: 0 6px 28px rgba(0,0,0,0.35);
          padding: 32px 24px;
          text-align: left;
        }
        .consent-card .title {
          margin: 0 0 0.25rem 0;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: #000;
        }
        .consent-card .lead { color: #333; line-height: 1.55; margin: 0.75rem 0; }

        .consent-button {
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
          margin-top: 1.25rem;
          border: 1px solid #0afe0a;
          border-radius: 8px;
          background-color: #000;
          color: #0afe0a;
          cursor: pointer;
          transition: transform 120ms ease, background 120ms ease, color 120ms ease;
        }
        .consent-button:hover {
          background-color: #0afe0a;
          color: #000;
          transform: translateY(-1px);
        }

        /* Media */
        video, canvas {
          max-width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

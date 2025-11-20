import React, { useEffect, useRef, useState } from "react";
import "./css/about.css";

const Aboutus = () => {
  const [speaking, setSpeaking] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(true);
  const utteranceRef = useRef(null);

  // The text we will read aloud
  const aboutText = `
    At Automart, we specialise in supplying high-quality spare parts and components
    for a broad range of vehicle makes and models. Whether you need engine parts,
    transmissions, suspension components, or electrical spares, we source parts
    from trusted manufacturers and inspect every item before it reaches you.

    In addition to parts sales, we offer professional car service and maintenance —
    routine servicing, diagnostics, brake and clutch replacement, oil changes,
    and full inspections performed by experienced technicians.

    We also provide assembling services for newly imported vehicles: from
    receiving and unpacking to full assembly, testing, and delivery-ready
    handovers. Our end-to-end service helps buyers receive properly assembled
    and tested vehicles faster and with reliable quality control.

    We offer nationwide shipping, competitive pricing, and after-sales support.
    Contact us for part lookups, service bookings, or custom assembly enquiries.
  `;

  useEffect(() => {
    // detect browser support
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setTtsSupported(false);
      return;
    }
    setTtsSupported(true);

    // cleanup on unmount: stop any speaking
    return () => {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    };
  }, []);

  const handleSpeak = () => {
    if (!ttsSupported) return;

    // If currently speaking, stop it
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    // Create a new utterance and start speaking
    const utterance = new SpeechSynthesisUtterance(aboutText);
    // Optional voice settings (let browser choose default voice)
    utterance.lang = "en-GB"; // choose a reasonable default
    utterance.rate = 1; // can be tuned 0.5 - 2
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setSpeaking(false);
      utteranceRef.current = null;
    };
    utterance.onerror = () => {
      setSpeaking(false);
      utteranceRef.current = null;
    };

    // start speaking
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const handleStop = () => {
    if (!ttsSupported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    utteranceRef.current = null;
  };

  return (
    <section 
    style={{
      backgroundImage: 'url("/images/background-3.jpeg")', 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
    }}className="about-us ">
      <div className="container">
        <h2 style={{
          textAlign:'center',
          fontSize:'30xp',
          color:''
        }}>About Us</h2>

        <p 
        style={{
          color:'white'
        }}className="lead about-paragraph">
          At <strong>Automart</strong>, we specialise in supplying high-quality spare parts and components
          for a wide variety of vehicles — from common wear items to hard-to-find components.
          Every part is sourced from trusted manufacturers or carefully inspected before sale to ensure reliability and value.
        </p>

        <div className="about-details">
          <div className="detail">
            <h3>What We Offer</h3>
            <p>
              We provide new and refurbished spare parts including engines, transmissions,
              suspension systems, electrical components, filters, and more. Each part undergoes
              quality checks to ensure fitment and performance.
            </p>
          </div>

          <div className="detail">
            <h3>Service & Maintenance</h3>
            <p>
              Our workshop offers full car service and maintenance: routine servicing,
              diagnostics, brake and clutch replacements, oil changes, wheel alignment, and more.
              Our certified technicians use industry-standard tools and follow manufacturer procedures.
            </p>
          </div>

          <div className="detail">
            <h3>Vehicle Assembly (Imported Units)</h3>
            <p>
              We also assemble newly imported vehicles — from receiving and inventory checks,
              through mechanical and electrical assembly, to testing and handover. Our assembly service
              ensures vehicles arrive road-ready and compliant.
            </p>

            <ul>
              <li>Quality-tested spare parts and components</li>
              <li>Workshop servicing and scheduled maintenance</li>
              <li>Full assembly and testing for imported vehicles</li>
              <li>Nationwide shipping and after-sales support</li>
            </ul>
          </div>
        </div>

        <p style={{
          color:'white'
        }} className="small text-muted mt-3">
          We offer competitive pricing, fast delivery options, and expert after-sales support. Contact us to check part availability or to book a service or assembly slot.
        </p>
      </div>

      {/* Speech control UI — fixed to the right margin */}
      <div className="tts-control" aria-hidden={false}>
        <button
          className={`tts-btn ${speaking ? "speaking" : ""}`}
          onClick={handleSpeak}
          aria-pressed={speaking}
          aria-label={ttsSupported ? (speaking ? "Stop reading" : "Read aloud About Us") : "Text to speech not supported"}
          title={ttsSupported ? (speaking ? "Stop reading" : "Read aloud About Us") : "Text to speech not supported in this browser"}
        >
          {/* simple speaker SVG icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="M3 10v4h4l5 5V5L7 10H3z" fill="currentColor"/>
            <path d="M16.5 8.5a4.5 4.5 0 010 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* optional stop button shown while speaking */}
        {speaking && (
          <button
            className="tts-stop"
            onClick={handleStop}
            aria-label="Stop reading"
            title="Stop reading"
          >
            &#10006;
          </button>
        )}

        {/* small status label for screen-reader users */}
        <span className="visually-hidden" role="status" aria-live="polite">
          {ttsSupported ? (speaking ? "Reading About Us" : "Not reading") : "Text to speech not supported"}
        </span>
      </div>
    </section>
  );
};

export default Aboutus;

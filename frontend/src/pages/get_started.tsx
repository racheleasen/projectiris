import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onEnableCamera: () => void;
}

export default function GetStarted({ onEnableCamera }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    onEnableCamera();      // enable camera + consent
    navigate("/");         // redirect to homepage
  };

  return (
    <main className="standardPage">
      <div className="standardCard">
        <h1>Let’s Get Started</h1>
        <p>
          Project Iris uses your webcam to enable gaze-based interaction —
          no video is uploaded, and you remain in control at all times.
        </p>

        <p>
          By continuing, you’ll enable camera access and consent to anonymous analytics that help us improve accuracy.
        </p>

        <button className="consentButton" onClick={handleClick}>
          Opt-in & Continue
        </button>
      </div>
    </main>
  );
}

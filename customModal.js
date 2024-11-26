import React, { useState, useEffect } from "react";
import "./Multiform.css";

function CustomModal({ onClose, message }) {
  const [animationClass, setAnimationClass] = useState("prompt-enter");

  useEffect(() => {
    const timeout = setTimeout(
      () => setAnimationClass("prompt-enter-active"),
      10
    );
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setAnimationClass("prompt-exit-active");
    setTimeout(() => onClose(), 400);
  };

  return (
    <div className={`prompt ${animationClass}`}>
      <div className="prompt-content">
        <span style={{ color: "whitesmoke" }}>{message}</span>
        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
}

export default CustomModal;

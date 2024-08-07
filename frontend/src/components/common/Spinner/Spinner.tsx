import React from "react";
import "./Spinner.css";

export const Spinner = () => {
  return (
    <div className="Spinner__container">
      <h4 className="Spinner__text">Loading...</h4>
      <div className="Spinner"></div>
    </div>
  );
};

import React from "react";
import { useEffect } from "react";
import "./schedule.css";

const Schedule = (props) => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head.appendChild(script);
  });

  return (
    <div className="schedule">
      <h3 className='title' >Schedule</h3>

      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/drphoto"
        
      ></div>
    </div>
  );
};

export default Schedule;

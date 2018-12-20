import React from "react";
import "./Ad.css";

export function Ad(props) {
  return (
    <div id="adContainer">
      <img className={props.class} src={props.src} />
    </div>
  );
}

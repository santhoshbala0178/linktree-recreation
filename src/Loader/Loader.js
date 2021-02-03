import React from "react";
import "./style.css";

export default function Loader(props) {
  return (
    <div className="transparent-parent">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

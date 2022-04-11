import React from "react";

const Bar1 = () => (
  <svg
    className="game__bar"
    x="0px"
    y="0px"
    width="56"
    height="226"
    viewBox="0 0 56 226"
  >
    <defs>
      <filter
        id="Rectangl0001"
        x="0"
        y="0"
        width="56"
        height="226"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy="5" />
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feFlood flood-color="#474766" flood-opacity="0.404" />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangl0001)">
      <rect
        id="Rectangl0001-2"
        width="196"
        height="26"
        rx="13"
        transform="translate(15 206) rotate(-90)"
        fill="#656588"
      />
    </g>
  </svg>
);

export default Bar1;

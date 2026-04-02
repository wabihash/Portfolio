"use client";

export default function HeatShimmer() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-70 mix-blend-screen" preserveAspectRatio="none" viewBox="0 0 1200 700">
      <defs>
        <filter id="heat-shimmer">
          <feTurbulence baseFrequency="0.012 0.028" numOctaves="2" seed="8" stitchTiles="stitch" type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" scale="12" />
        </filter>
        <linearGradient id="heat-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="30%" stopColor="#fbbf24" />
          <stop offset="62%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <g filter="url(#heat-shimmer)" opacity="0.55">
        <rect width="1200" height="700" fill="url(#heat-gradient)" opacity="0.08" />
        <ellipse cx="600" cy="350" rx="280" ry="120" fill="url(#heat-gradient)" opacity="0.18" />
      </g>
    </svg>
  );
}
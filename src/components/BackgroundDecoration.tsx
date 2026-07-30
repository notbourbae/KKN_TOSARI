import React from 'react';

export const BackgroundDecoration: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Animated Glowing Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-emerald-500/15 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 sm:w-[450px] sm:h-[450px] bg-teal-500/15 rounded-full blur-3xl animate-float-reverse" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-amber-400/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 sm:w-[400px] sm:h-[400px] bg-emerald-600/10 rounded-full blur-3xl animate-float-slow" />

      {/* Topographic Rice Terraces & Mountain Outline Vector Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] text-slate-900 mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="topography" width="200" height="200" patternUnits="userSpaceOnUse">
            <path
              d="M 10 10 C 50 40, 150 10, 190 50 C 230 90, 130 150, 80 190 C 30 230, 20 120, 10 10 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M 30 30 C 70 60, 130 30, 170 70 C 210 110, 110 170, 60 170 C 10 170, 10 100, 30 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M 50 50 C 90 80, 110 50, 150 90 C 190 130, 90 150, 40 150 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topography)" />
      </svg>

      {/* Mountain & Rice Paddy Horizon Vector Line Art at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.04] text-emerald-950 flex items-end">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,224C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Decorative Floating Sparkles / Rice Grain Dots */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-emerald-400/30 animate-ping" />
      <div className="absolute top-2/3 right-12 w-2.5 h-2.5 rounded-full bg-teal-400/30 animate-pulse" />
      <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/40 animate-ping" />
    </div>
  );
};

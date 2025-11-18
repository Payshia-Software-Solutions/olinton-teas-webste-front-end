'use client';

import React from 'react';

const Snowfall = ({ snowflakeCount = 200 }) => {
  // Don't render on server
  if (typeof window === 'undefined') {
    return null;
  }
  
  const snowflakes = Array.from({ length: snowflakeCount }).map((_, i) => {
    const style: React.CSSProperties = {
      '--size': `${Math.random() * 2 + 1}px`,
      '--x-start': `${Math.random() * 100}vw`,
      '--x-end': `${Math.random() * 100}vw`,
      '--animation-duration': `${Math.random() * 10 + 10}s`,
      '--animation-delay': `-${Math.random() * 20}s`,
    };
    return <div key={i} className="snowflake" style={style}></div>;
  });

  return <div className="snowfall-container" aria-hidden="true">{snowflakes}</div>;
};

export default Snowfall;

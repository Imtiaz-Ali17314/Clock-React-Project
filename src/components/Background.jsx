import { useState } from "react";

/**
 * Background - Creates a dynamic, generative starfield with centralized density 
 * and drifting celestial bodies.
 */
const Background = () => {
  const [stars] = useState(() => {
    const totalStars = 450;
    const colors = ["#ffffff", "#e0e7ff", "#fef3c7", "#fae8ff", "#dee2e6"];
    
    return Array.from({ length: totalStars }).map((_, i) => {
      // Create a bias towards the center for a "Core" effect near the clock
      const isCoreStar = i > 250;
      let left, top;
      
      if (isCoreStar) {
        // Normal distribution around 50%
        left = 40 + Math.random() * 20; 
        top = 40 + Math.random() * 20;
      } else {
        left = Math.random() * 100;
        top = Math.random() * 100;
      }

      const isDrifting = i % 15 === 0; // 1 in 15 stars move

      return {
        id: i,
        left: `${left}%`,
        top: `${top}%`,
        size: `${1 + Math.random() * 3}px`, // Slightly larger
        delay: `${Math.random() * 10}s`,
        duration: `${4 + Math.random() * 8}s`,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: 3 + Math.random() * 8,
        isDrifting,
        driftDuration: `${15 + Math.random() * 20}s`,
      };
    });
  });

  return (
    <div className="nebula-background">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.isDrifting ? 'drifting' : ''}`}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            "--delay": star.delay,
            "--duration": star.duration,
            "--glow": `${star.glow}px`,
            "--star-color": star.color,
            "--drift-duration": star.driftDuration,
          }}
        />
      ))}
    </div>
  );
};

export default Background;

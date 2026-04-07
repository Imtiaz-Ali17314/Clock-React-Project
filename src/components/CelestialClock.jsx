import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Zap, Compass, Timer, Rewind, FastForward } from "lucide-react";

/**
 * OrbitalPlanet - Renders an orbital planet on its track.
 * Declared outside to prevent re-creation on every render.
 */
const OrbitalPlanet = ({ degree, type, size, warpMultiplier, children }) => (
  <motion.div
    className="planet-track"
    animate={{ rotate: degree }}
    transition={{ 
      type: warpMultiplier === 1 ? "tween" : "spring", 
      ease: "linear",
      duration: warpMultiplier === 1 && type === 'seconds' ? 1 : 0.5,
      stiffness: 100,
      damping: 30
    }}
  >
    <div className={`planet planet-${type}`} style={{ width: size, height: size }}>
      {children}
    </div>
  </motion.div>
);

/**
 * CelestialClock - A high-end generative clock visualizing time as planetary orbits.
 */
const CelestialClock = () => {
  const [baseTime, setBaseTime] = useState(new Date());
  const [warpMultiplier, setWarpMultiplier] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef();

  useEffect(() => {
    const update = () => {
      if (warpMultiplier === 1) {
        setBaseTime(new Date());
      } else {
        setBaseTime(prev => new Date(prev.getTime() + (1000 / 60) * warpMultiplier));
      }
      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [warpMultiplier]);

  const hours = baseTime.getHours();
  const minutes = baseTime.getMinutes();
  const seconds = baseTime.getSeconds();

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minDeg = minutes * 6;
  const secDeg = seconds * 6;

  const formattedTime = baseTime.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = baseTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="clock-main-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="status-badge">
          <Zap size={14} fill="currentColor" />
          {warpMultiplier === 1 ? "LIVE QUANTUM SYNC" : `WARP SPEED: ${warpMultiplier}x`}
        </div>

        <div className="orbital-system">
          <div className="orbital-ring ring-hours" />
          <div className="orbital-ring ring-minutes" />
          <div className="orbital-ring ring-seconds" />

          <div className="orbital-ring ring-hours">
            <OrbitalPlanet degree={hourDeg} type="hours" size="40px" warpMultiplier={warpMultiplier}>
              {hours}
            </OrbitalPlanet>
          </div>

          <div className="orbital-ring ring-minutes">
            <OrbitalPlanet degree={minDeg} type="minutes" size="30px" warpMultiplier={warpMultiplier}>
              {minutes}
            </OrbitalPlanet>
          </div>

          <div className="orbital-ring ring-seconds">
            <OrbitalPlanet degree={secDeg} type="seconds" size="20px" warpMultiplier={warpMultiplier} />
          </div>

          <div className="central-display" style={{ textAlign: "center", zIndex: 100 }}>
            <motion.h1 className="digital-time">
              {formattedTime}
            </motion.h1>
            <div className="digital-date">{formattedDate}</div>
          </div>
        </div>

        <motion.div
          className="info-grid"
          animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? -5 : 0 }}
        >
          <div className="info-item">
            <Globe size={18} className="text-secondary" />
            <span className="info-label">Timezone</span>
            <span className="info-value">GMT+5</span>
          </div>
          <div className="info-item">
            <Compass size={18} className="text-secondary" />
            <span className="info-label">Rotation</span>
            <span className="info-value">{Math.round(secDeg)}°</span>
          </div>
          <div className="info-item">
            <Timer size={18} className="text-secondary" />
            <span className="info-label">Epoch</span>
            <span className="info-value">{Math.floor(baseTime.getTime() / 1000)}</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="controls-container">
        <button 
          className="control-btn" 
          onClick={() => setWarpMultiplier(1)}
          style={{ borderColor: warpMultiplier === 1 ? "var(--accent-primary)" : "transparent" }}
        >
          <Rewind size={16} /> Real-time
        </button>
        
        <div className="warp-slider-container">
          <FastForward size={16} color="var(--accent-primary)" />
          <input 
            type="range" 
            min="1" 
            max="1000" 
            value={warpMultiplier} 
            onChange={(e) => setWarpMultiplier(parseInt(e.target.value))}
            className="warp-slider"
          />
          <span style={{ fontSize: "0.8rem", width: "45px", fontWeight: "bold" }}>{warpMultiplier}x</span>
        </div>
      </div>
    </>
  );
};

export default CelestialClock;

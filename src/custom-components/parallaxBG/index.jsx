import { useEffect, useRef, useState } from "react";
import "./index.css";

export const Parallax = ({
  image,
  height = "140%",
  speed = 0.3,
  children,
}) => {
  const containerRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // distance from viewport center (more stable than scrollY)
      const offset = rect.top;

      setOffsetY(offset);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // run once on mount
    updatePosition();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="parallax-parent-container"
      style={{ height }}
    >
      {/* Background layer */}
      <div
        className="parallax-inner-container"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translateY(${offsetY * speed}px)`,
        }}
      />

      {/* Foreground */}
      <div className="parallax-children-container">
        {children}
      </div>
    </div>
  );
};
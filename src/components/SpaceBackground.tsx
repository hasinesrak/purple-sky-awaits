
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PlanetProps {
  size: number;
  color: string;
  positionX: string;
  positionY: string;
  orbitDuration: number;
  orbitSize: number;
  hasRing?: boolean;
}

const SpaceBackground: React.FC = () => {
  const blackHoleRef = useRef<HTMLDivElement>(null);
  
  // Create the black hole rotating effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (blackHoleRef.current) {
        const currentRotation = blackHoleRef.current.style.transform || 'rotate(0deg)';
        const rotationValue = parseInt(currentRotation.replace(/[^0-9]/g, '') || '0');
        blackHoleRef.current.style.transform = `rotate(${rotationValue + 1}deg)`;
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const planets: PlanetProps[] = [
    { size: 30, color: "#6366F1", positionX: "15%", positionY: "20%", orbitDuration: 120, orbitSize: 20 },
    { size: 18, color: "#A5B4FC", positionX: "75%", positionY: "15%", orbitDuration: 80, orbitSize: 15 },
    { size: 40, color: "#8B5CF6", positionX: "70%", positionY: "70%", orbitDuration: 150, orbitSize: 25, hasRing: true },
    { size: 15, color: "#C4B5FD", positionX: "25%", positionY: "75%", orbitDuration: 60, orbitSize: 10 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Black hole */}
      <div className="absolute w-[300px] h-[300px] left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <div 
          ref={blackHoleRef}
          className="absolute w-full h-full rounded-full bg-gradient-radial from-transparent via-purplish-blue/20 to-transparent"
          style={{ 
            boxShadow: "0 0 100px 20px rgba(99, 102, 241, 0.15)",
            animation: "pulse 8s ease-in-out infinite"
          }}
        >
          {/* Inner black hole */}
          <div className="absolute left-1/2 top-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dark">
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-purplish-blue/30 via-dark to-dark"></div>
          </div>
          
          {/* Accretion disk */}
          <div className="absolute left-1/2 top-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[15px] border-purplish-blue/20 transform rotate-45"></div>
          <div className="absolute left-1/2 top-1/2 w-[230px] h-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-light-purple/10 transform rotate-12"></div>
          <div className="absolute left-1/2 top-1/2 w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-glow-purple/5 transform rotate-90"></div>
        </div>
      </div>
      
      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet key={index} {...planet} />
      ))}
    </div>
  );
};

const Planet: React.FC<PlanetProps> = ({ 
  size, 
  color, 
  positionX, 
  positionY, 
  orbitDuration,
  orbitSize,
  hasRing
}) => {
  return (
    <div 
      className="absolute animate-being-pulled"
      style={{ 
        left: positionX, 
        top: positionY,
        animation: `float ${orbitDuration}s ease-in-out infinite, being-pulled 30s ease-in-out infinite`,
        transform: `translateY(0px)`,
      }}
    >
      {/* Planet body */}
      <div 
        className="rounded-full"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          background: `linear-gradient(135deg, ${color}, #121212)`,
          boxShadow: `0 0 ${size/2}px ${size/10}px rgba(139, 92, 246, 0.15)`,
        }}
      >
        {/* Planet surface details */}
        <div className="w-full h-full rounded-full overflow-hidden opacity-30">
          <div className="w-1/3 h-1/3 rounded-full bg-white/10 absolute top-1/4 left-1/4 transform rotate-45"></div>
          <div className="w-1/4 h-1/4 rounded-full bg-white/10 absolute bottom-1/3 right-1/3"></div>
        </div>
      </div>
      
      {/* Optional ring for planet */}
      {hasRing && (
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${size * 1.8}px`,
            height: `${size * 0.5}px`,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            opacity: 0.5,
            transform: "translateX(-50%) translateY(-50%) rotateX(75deg)",
          }}
        ></div>
      )}
      
      {/* Moon */}
      {(size > 25) && (
        <div 
          className="absolute rounded-full bg-light-purple/70"
          style={{ 
            width: `${size * 0.3}px`, 
            height: `${size * 0.3}px`,
            animation: `orbit ${orbitDuration / 2}s linear infinite`,
            transformOrigin: `${size / 2}px ${size / 2}px`,
          }}
        ></div>
      )}
    </div>
  );
};

export default SpaceBackground;
